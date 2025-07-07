const fs = require('fs');
const path = require('path');

// Function to reconstruct car data from image filenames
function reconstructCarsData() {
  const imagesDir = path.join(__dirname, '../public/images');
  const imageFiles = fs.readdirSync(imagesDir).filter(file => 
    file.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );
  
  console.log(`Found ${imageFiles.length} image files`);
  
  const cars = [];
  
  imageFiles.forEach((filename, index) => {
    // Remove extension
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    // Convert filename back to car data
    const id = nameWithoutExt.toLowerCase();
    
    // Try to extract brand and model from filename
    const parts = nameWithoutExt.split('_');
    let brand = '';
    let model = '';
    let fullName = '';
    
    if (parts.length >= 2) {
      brand = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      model = parts.slice(1).map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
      fullName = `${brand} ${model}`;
    } else {
      brand = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      model = brand;
      fullName = brand;
    }
    
    // Handle special cases
    if (brand.toLowerCase() === 'mercedes') {
      brand = 'Mercedes-Benz';
      fullName = `Mercedes-Benz ${model}`;
    }
    if (brand.toLowerCase() === 'rolls') {
      brand = 'Rolls-Royce';
      fullName = `Rolls-Royce ${model}`;
    }
    if (brand.toLowerCase() === 'alfa') {
      brand = 'Alfa Romeo';
      fullName = `Alfa Romeo ${model}`;
    }
    
    const car = {
      id: id,
      brand: brand,
      model: model,
      fullName: fullName,
      imageUrl: `/images/${filename}`,
      wikipediaUrl: `https://en.wikipedia.org/wiki/${fullName.replace(/ /g, '_')}`
    };
    
    cars.push(car);
  });
  
  // Sort cars by brand and model
  cars.sort((a, b) => {
    if (a.brand !== b.brand) {
      return a.brand.localeCompare(b.brand);
    }
    return a.model.localeCompare(b.model);
  });
  
  console.log(`Reconstructed ${cars.length} cars`);
  return cars;
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

// Main function
function main() {
  console.log('Reconstructing cars data from image files...');
  const cars = reconstructCarsData();
  saveCars(cars);
  console.log(`✅ Successfully reconstructed ${cars.length} cars`);
  console.log('💾 Data saved to src/data/cars.ts');
}

main();