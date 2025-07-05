const https = require('https');
const fs = require('fs');
const path = require('path');

// Get all cars from the comprehensive database
const carDatabase = require('./car-database.js');

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
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
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

// Function to load existing cars from file
function loadExistingCars() {
  try {
    const carFile = path.join(__dirname, '../src/data/cars.ts');
    if (fs.existsSync(carFile)) {
      const content = fs.readFileSync(carFile, 'utf8');
      const match = content.match(/export const cars: Car\[\] = (\[[\s\S]*?\]);/);
      if (match) {
        return JSON.parse(match[1]);
      }
    }
  } catch (error) {
    console.log('Could not load existing cars, starting fresh');
  }
  return [];
}

// Function to save cars to file
function saveCars(cars) {
  const carDataContent = `import { Car } from '../types';

export const cars: Car[] = ${JSON.stringify(cars, null, 2)};

export default cars;
`;
  
  fs.writeFileSync(
    path.join(__dirname, '../src/data/cars.ts'),
    carDataContent
  );
}

// Main function to expand dataset
async function expandDataset() {
  console.log(`Starting dataset expansion with ${carDatabase.length} cars...`);
  
  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, '../public/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // Load existing cars
  let cars = loadExistingCars();
  const existingIds = new Set(cars.map(car => car.id));
  console.log(`Found ${cars.length} existing cars in dataset`);
  
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  
  for (let i = 0; i < carDatabase.length; i++) {
    const pageName = carDatabase[i];
    const carId = pageName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Skip if already exists
    if (existingIds.has(carId)) {
      skippedCount++;
      console.log(`⏭️  Skipping ${pageName} (already exists)`);
      continue;
    }
    
    try {
      console.log(`Scraping ${pageName}... (${i + 1}/${carDatabase.length})`);
      const car = await scrapeCarData(pageName);
      
      // Download the image
      const imageExtension = car.imageUrl.split('.').pop().split('?')[0];
      const imageFilename = `${car.id}.${imageExtension}`;
      
      await downloadImage(car.imageUrl, imageFilename);
      
      // Update the car object with local image path
      car.imageUrl = `/images/${imageFilename}`;
      
      cars.push(car);
      existingIds.add(car.id);
      successCount++;
      console.log(`✓ Scraped ${car.fullName} (${successCount} new cars)`);
      
      // Save progress every 50 cars
      if (successCount % 50 === 0) {
        saveCars(cars);
        console.log(`💾 Progress saved: ${cars.length} total cars`);
      }
      
      // Add a small delay to be respectful to Wikipedia's servers
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      failCount++;
      console.error(`✗ Failed to scrape ${pageName}: ${error.message} (${failCount} failed)`);
      continue;
    }
  }
  
  // Save final dataset
  saveCars(cars);
  
  console.log(`\\n🎉 Dataset expansion complete!`);
  console.log(`📊 Results: ${successCount} new cars, ${failCount} failed, ${skippedCount} skipped`);
  console.log(`📈 Total dataset: ${cars.length} cars`);
  console.log('💾 Data saved to src/data/cars.ts');
}

// Run the expansion
expandDataset().catch(console.error);