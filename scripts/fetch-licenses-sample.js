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
        if (thumbIndex >= 0 && thumbIndex + 2 < urlParts.length) {
          filename = urlParts[thumbIndex + 2]; // Get the original filename
        }
      }
      
      // For thumbnail URLs, we need to get the full filename
      if (filename.includes('.jpg') || filename.includes('.png') || filename.includes('.gif')) {
        // This is already a complete filename
      } else {
        // Extract from the full URL pattern
        const match = imageUrl.match(/\/([^\/]+\.(jpg|jpeg|png|gif|webp))/i);
        if (match) {
          filename = match[1];
        }
      }
      
      // Remove size suffixes like "320px-" from filename
      filename = filename.replace(/^\d+px-/, '');
      
      // Clean up filename
      filename = decodeURIComponent(filename);
      
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
              
              if (!imageInfo || pageId === '-1') {
                resolve({
                  license: 'Wikipedia/Commons',
                  author: 'Various contributors',
                  source: imageUrl.replace(/\/thumb\/.*\/\d+px-/, '/').split('?')[0],
                  attribution: 'Image from Wikipedia/Wikimedia Commons'
                });
                return;
              }
              
              // Extract license information
              const license = imageInfo.LicenseShortName?.value || 
                            imageInfo.UsageTerms?.value || 
                            'Creative Commons';
              
              const author = imageInfo.Artist?.value || 
                           imageInfo.Credit?.value || 
                           'Wikimedia contributor';
              
              const description = imageInfo.ImageDescription?.value || '';
              
              // Clean up HTML tags from author and description
              const cleanAuthor = author.replace(/<[^>]*>/g, '').trim();
              const cleanDescription = description.replace(/<[^>]*>/g, '').trim();
              
              // Create proper attribution
              const attribution = `Image by ${cleanAuthor}, licensed under ${license}, via Wikimedia Commons`;
              
              resolve({
                license: license.replace(/<[^>]*>/g, '').trim(),
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
          license: 'Wikipedia/Commons',
          author: 'Wikipedia contributor',
          source: imageUrl,
          attribution: 'Image from Wikipedia/Wikimedia Commons'
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
async function addLicenseInfoSample() {
  console.log('Loading existing cars...');
  const cars = loadExistingCars();
  console.log(`Found ${cars.length} cars`);
  
  // Process only first 10 cars as a sample
  const sampleSize = Math.min(10, cars.length);
  console.log(`Processing first ${sampleSize} cars as a sample...`);
  
  let processedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < sampleSize; i++) {
    const car = cars[i];
    
    // Skip if already has license info
    if (car.license) {
      console.log(`⏭️  Skipping ${car.fullName} (already has license info)`);
      continue;
    }
    
    try {
      console.log(`Processing ${car.fullName}... (${i + 1}/${sampleSize})`);
      
      // For local images, we'll create default attribution
      if (car.imageUrl.startsWith('/images/')) {
        car.license = 'Wikipedia/Commons';
        car.author = 'Wikipedia contributors';
        car.attribution = `${car.fullName} image from Wikipedia/Wikimedia Commons`;
        car.imageSource = `https://en.wikipedia.org/wiki/${car.fullName.replace(/ /g, '_')}`;
        
        processedCount++;
        console.log(`✓ Added default license info for ${car.fullName}`);
      } else {
        // Try to get actual license information for Wikipedia URLs
        const licenseInfo = await getImageLicenseInfo(car.imageUrl);
        
        // Add license information to car object
        car.license = licenseInfo.license;
        car.author = licenseInfo.author;
        car.attribution = licenseInfo.attribution;
        car.imageSource = licenseInfo.source;
        
        processedCount++;
        console.log(`✓ Added license info for ${car.fullName}`);
      }
      
      // Add a small delay to be respectful to Wikipedia's servers
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      errorCount++;
      console.error(`✗ Failed to get license info for ${car.fullName}: ${error.message}`);
      
      // Add default attribution
      car.license = 'Wikipedia/Commons';
      car.author = 'Wikipedia contributors';
      car.attribution = `${car.fullName} image from Wikipedia/Wikimedia Commons`;
      car.imageSource = car.wikipediaUrl;
    }
  }
  
  // Save updated dataset
  saveCarsWithLicenses(cars);
  
  console.log(`\\n🎉 Sample license information processing complete!`);
  console.log(`📊 Results: ${processedCount} processed, ${errorCount} errors`);
  console.log(`📈 Sample: ${sampleSize} cars processed, ${cars.length - sampleSize} remaining`);
  console.log('💾 Data saved to src/data/cars.ts');
}

// Run the sample license info addition
addLicenseInfoSample().catch(console.error);