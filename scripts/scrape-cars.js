const https = require('https');
const fs = require('fs');
const path = require('path');

// Import comprehensive car database
const carDatabase = require('./car-database.js');
const carPages = carDatabase;

// Function to extract car data from Wikipedia API with retry logic
async function scrapeCarData(pageName, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await new Promise((resolve, reject) => {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${pageName}`;
        
        const options = {
          headers: {
            'User-Agent': 'CarFinderGame/1.0 (https://github.com/car-finder-game; car-finder@example.com) Node.js'
          }
        };
        
        const request = https.get(url, options, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            try {
              const pageData = JSON.parse(data);
              
              if (pageData.thumbnail) {
                // Extract brand and model from the title
                const fullName = pageData.title.replace(/_/g, ' ');
                const parts = fullName.split(' ');
                
                // Handle compound brand names (e.g., Mercedes-Benz, Rolls-Royce)
                let brand, model;
                if (fullName.includes('-')) {
                  const dashIndex = fullName.indexOf('-');
                  const spaceAfterDash = fullName.indexOf(' ', dashIndex);
                  if (spaceAfterDash > 0) {
                    brand = fullName.substring(0, spaceAfterDash);
                    model = fullName.substring(spaceAfterDash + 1);
                  } else {
                    brand = parts[0];
                    model = parts.slice(1).join(' ');
                  }
                } else {
                  brand = parts[0];
                  model = parts.slice(1).join(' ');
                }
                
                const car = {
                  id: pageName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                  brand: brand,
                  model: model || brand,
                  fullName: fullName,
                  imageUrl: pageData.thumbnail.source,
                  wikipediaUrl: `https://en.wikipedia.org/wiki/${pageName}`
                };
                
                resolve(car);
              } else {
                reject(new Error(`No image found for ${pageName}`));
              }
            } catch (error) {
              reject(error);
            }
          });
        });
        
        request.on('error', (error) => {
          reject(error);
        });
        
        request.setTimeout(10000, () => {
          request.destroy();
          reject(new Error(`Request timeout for ${pageName}`));
        });
      });
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      console.log(`  ⚠️  Attempt ${attempt} failed for ${pageName}, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
    }
  }
}

// Function to download and save an image with retry logic
async function downloadImage(imageUrl, filename, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../public/images', filename);
        const file = fs.createWriteStream(filePath);
        
        const options = {
          headers: {
            'User-Agent': 'CarFinderGame/1.0 (https://github.com/car-finder-game; car-finder@example.com) Node.js'
          }
        };
        
        const request = https.get(imageUrl, options, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
            return;
          }
          
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            resolve();
          });
          
          file.on('error', (error) => {
            fs.unlink(filePath, () => {});
            reject(error);
          });
        });
        
        request.on('error', (error) => {
          fs.unlink(filePath, () => {});
          reject(error);
        });
        
        request.setTimeout(15000, () => {
          request.destroy();
          fs.unlink(filePath, () => {});
          reject(new Error(`Download timeout for ${filename}`));
        });
      });
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      console.log(`  ⚠️  Download attempt ${attempt} failed for ${filename}, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// Main scraping function
async function scrapeAllCars() {
  console.log(`Starting car data scraping for ${carPages.length} cars...`);
  
  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, '../public/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  const cars = [];
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < carPages.length; i++) {
    const pageName = carPages[i];
    try {
      console.log(`Scraping ${pageName}... (${i + 1}/${carPages.length})`);
      const car = await scrapeCarData(pageName);
      
      // Download the image
      const imageExtension = car.imageUrl.split('.').pop().split('?')[0];
      const imageFilename = `${car.id}.${imageExtension}`;
      
      await downloadImage(car.imageUrl, imageFilename);
      
      // Update the car object with local image path
      car.imageUrl = `/images/${imageFilename}`;
      
      cars.push(car);
      successCount++;
      console.log(`✓ Scraped ${car.fullName} (${successCount} successful)`);
      
      // Add a delay to be respectful to Wikipedia's servers
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Save progress periodically (every 100 cars)
      if (cars.length > 0 && cars.length % 100 === 0) {
        const progressData = `import { Car } from '../types';

export const cars: Car[] = ${JSON.stringify(cars, null, 2)};

export default cars;
`;
        fs.writeFileSync(
          path.join(__dirname, '../src/data/cars.ts'),
          progressData
        );
        console.log(`📁 Progress saved: ${cars.length} cars collected`);
      }
      
    } catch (error) {
      failCount++;
      console.error(`✗ Failed to scrape ${pageName}: ${error.message} (${failCount} failed)`);
      
      // Continue even if some cars fail
      continue;
    }
  }
  
  // Save the cars data to a TypeScript file
  const carDataContent = `import { Car } from '../types';

export const cars: Car[] = ${JSON.stringify(cars, null, 2)};

export default cars;
`;
  
  fs.writeFileSync(
    path.join(__dirname, '../src/data/cars.ts'),
    carDataContent
  );
  
  console.log(`\\n🎉 Scraping complete!`);
  console.log(`📊 Results: ${successCount} successful, ${failCount} failed, ${cars.length} total cars collected`);
  console.log('💾 Data saved to src/data/cars.ts');
}

// Run the scraper
scrapeAllCars().catch(console.error);