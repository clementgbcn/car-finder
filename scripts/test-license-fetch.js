const https = require('https');

// Function to get license information for a Wikipedia image
async function getImageLicenseInfo(imageUrl) {
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
    
    console.log(`Testing with filename: ${filename}`);
    console.log(`API URL: ${apiUrl}`);
    
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
            console.log('Raw API Response:', JSON.stringify(response, null, 2));
            
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
    console.log(`Failed to get license info for ${imageUrl}: ${error.message}`);
    return {
      license: 'Unknown',
      author: 'Unknown',
      source: imageUrl,
      attribution: 'Image from Wikimedia Commons'
    };
  }
}

// Test with a sample image URL
async function testLicenseFetch() {
  // Use a sample Wikipedia image URL
  const testImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ferrari_F40_%28US%29_-_Flickr_-_Alexandre_Pr%C3%A9vot_%2826%29.jpg/320px-Ferrari_F40_%28US%29_-_Flickr_-_Alexandre_Pr%C3%A9vot_%2826%29.jpg';
  
  console.log('Testing license fetch for Ferrari F40 image...');
  const result = await getImageLicenseInfo(testImageUrl);
  
  console.log('License information:', result);
}

testLicenseFetch().catch(console.error);