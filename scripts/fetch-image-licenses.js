const https = require('https');
const fs = require('fs');
const path = require('path');

// Function to get license information for a Wikipedia image
async function getImageLicenseInfo(imageUrl, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Extract filename from Wikipedia URL
      const urlParts = imageUrl.split('/');
      let filename = urlParts[urlParts.length - 1];
      
      // Handle thumbnail URLs - extract original filename
      if (imageUrl.includes('/thumb/')) {
        const thumbIndex = urlParts.indexOf('thumb');
        filename = urlParts[thumbIndex + 2]; // Get the original filename
      }
      
      // Remove size suffixes like "320px-" from filename
      filename = filename.replace(/^\d+px-/, '');
      
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&titles=File:${encodeURIComponent(filename)}&format=json`;
      
      return await new Promise((resolve, reject) => {
        const options = {
          headers: {
            'User-Agent': 'CarFinderGame/1.0 (https://github.com/car-finder-game; car-finder@example.com) Node.js'
          }
        };
        
        const request = https.get(apiUrl, options, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            try {
              const response = JSON.parse(data);
              const pages = response.query?.pages;
              
              if (!pages) {
                resolve({
                  license: 'Unknown',
                  author: 'Unknown',
                  source: imageUrl,
                  attribution: 'Image from Wikimedia Commons'
                });
                return;
              }
              
              const pageId = Object.keys(pages)[0];
              const imageInfo = pages[pageId]?.imageinfo?.[0]?.extmetadata;
              
              if (!imageInfo) {
                resolve({
                  license: 'Unknown',
                  author: 'Unknown',
                  source: imageUrl,
                  attribution: 'Image from Wikimedia Commons'
                });
                return;
              }
              
              // Extract license information
              const license = imageInfo.LicenseShortName?.value || 
                            imageInfo.UsageTerms?.value || 
                            'Unknown';
              
              const author = imageInfo.Artist?.value || 
                           imageInfo.Credit?.value || 
                           'Unknown';
              
              const description = imageInfo.ImageDescription?.value || '';
              
              // Clean up HTML tags from author and description
              const cleanAuthor = author.replace(/<[^>]*>/g, '').trim();
              const cleanDescription = description.replace(/<[^>]*>/g, '').trim();
              
              // Create proper attribution
              const attribution = `Image by ${cleanAuthor}, licensed under ${license}, via Wikimedia Commons`;
              
              resolve({
                license: license,
                author: cleanAuthor,
                description: cleanDescription,
                source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`,
                attribution: attribution,
                filename: filename
              });
              
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
          reject(new Error(`Request timeout for ${filename}`));
        });
      });
    } catch (error) {
      if (attempt === retries) {
        console.log(`Failed to get license info for ${imageUrl}: ${error.message}`);
        return {
          license: 'Unknown',
          author: 'Unknown',
          source: imageUrl,
          attribution: 'Image from Wikimedia Commons'
        };
      }
      console.log(`Attempt ${attempt} failed for ${imageUrl}, retrying...`);
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
      // More robust regex to match the cars array
      const match = content.match(/export const cars: Car\[\] = (\[[\s\S]*?\]);/);
      if (match) {
        return JSON.parse(match[1]);
      }
    }
  } catch (error) {
    console.log('Could not load existing cars:', error.message);
  }
  return [];
}

// Function to save cars with license information
function saveCarsWithLicenses(cars) {
  const carDataContent = `import { Car } from '../types';

export const cars: Car[] = ${JSON.stringify(cars, null, 2)};

export default cars;
`;
  
  fs.writeFileSync(
    path.join(__dirname, '../src/data/cars.ts'),
    carDataContent
  );
}

// Main function to add license information to existing cars
async function addLicenseInfo() {
  console.log('Loading existing cars...');
  const cars = loadExistingCars();
  console.log(`Found ${cars.length} cars`);
  
  let processedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    
    // Skip if already has license info
    if (car.license) {
      console.log(`⏭️  Skipping ${car.fullName} (already has license info)`);
      continue;
    }
    
    try {
      console.log(`Processing ${car.fullName}... (${i + 1}/${cars.length})`);
      
      // Get license information
      const licenseInfo = await getImageLicenseInfo(car.imageUrl);
      
      // Add license information to car object
      car.license = licenseInfo.license;
      car.author = licenseInfo.author;
      car.attribution = licenseInfo.attribution;
      car.imageSource = licenseInfo.source;
      
      processedCount++;
      console.log(`✓ Added license info for ${car.fullName}`);
      
      // Save progress every 50 cars
      if (processedCount % 50 === 0) {
        saveCarsWithLicenses(cars);
        console.log(`💾 Progress saved: ${processedCount} cars processed`);
      }
      
      // Add a small delay to be respectful to Wikipedia's servers
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      errorCount++;
      console.error(`✗ Failed to get license info for ${car.fullName}: ${error.message}`);
      
      // Add default attribution
      car.license = 'Unknown';
      car.author = 'Unknown';
      car.attribution = 'Image from Wikimedia Commons';
      car.imageSource = car.imageUrl;
    }
  }
  
  // Save final dataset
  saveCarsWithLicenses(cars);
  
  console.log(`\\n🎉 License information processing complete!`);
  console.log(`📊 Results: ${processedCount} processed, ${errorCount} errors`);
  console.log(`📈 Total dataset: ${cars.length} cars with license information`);
  console.log('💾 Data saved to src/data/cars.ts');
}

// Run the license info addition
addLicenseInfo().catch(console.error);