# Image License Compliance

## Overview

This Car Finder Game uses images sourced from Wikipedia and Wikimedia Commons. All images are used in compliance with their respective Creative Commons licenses and public domain dedications.

## Licensing Summary

### Wikipedia Image Policy
- **All Wikipedia images must allow commercial use** - Images with non-commercial restrictions are not accepted on Wikipedia
- **Free licensing required** - All images use Creative Commons licenses (CC-BY, CC-BY-SA), GNU Free Documentation License (GFDL), or are in the public domain
- **Attribution required** - Proper credit must be given to authors as specified in their license terms

### Our Implementation

#### ✅ Compliance Measures
1. **Source Verification**: All images are sourced from Wikipedia's official REST API
2. **Attribution System**: Credits component displays proper attribution for all images
3. **License Information**: When available, license details are captured and displayed
4. **Source Links**: Direct links to original Wikimedia Commons pages are provided

#### 📋 Attribution Format
```
Image by [Author], licensed under [License], via Wikimedia Commons
Source: [Link to Commons page]
```

#### 🔧 Technical Implementation
- **License Fetching Script**: `scripts/fetch-image-licenses.js` retrieves license metadata
- **Credits Component**: `src/components/Credits.tsx` displays attributions to users
- **Data Structure**: Car objects include optional license fields (license, author, attribution, imageSource)

## Legal Considerations

### ✅ Allowed Usage
- **Commercial use**: All Wikipedia images allow commercial use
- **Modification**: Most licenses allow modification (resizing, cropping for thumbnails)
- **Distribution**: Free redistribution is permitted with proper attribution

### ⚠️ Requirements
- **Attribution**: Must be visible to users, not just in metadata
- **License Preservation**: License terms must be maintained
- **Source Documentation**: Original sources should be accessible

### 🛡️ Risk Mitigation
- **Default Attribution**: Images without available license info default to "Image from Wikimedia Commons"
- **Source Transparency**: All image sources are linked back to Wikipedia/Commons
- **User Accessibility**: Credits are easily accessible from the main menu

## For Developers

### Running License Check
```bash
npm run fetch-licenses
```

### Updating Attribution
When adding new images, ensure the license information is captured:
1. Run the license fetching script
2. Verify attribution information is complete
3. Test that credits display properly in the UI

### Best Practices
- Always capture license metadata when scraping images
- Display attribution prominently in the user interface
- Link back to original sources on Wikimedia Commons
- Respect any specific attribution requirements in the license

## Resources

- [Wikimedia Commons Licensing](https://commons.wikimedia.org/wiki/Commons:Licensing)
- [Creative Commons Licenses](https://creativecommons.org/licenses/)
- [Wikipedia Image Use Policy](https://en.wikipedia.org/wiki/Wikipedia:Image_use_policy)

## Contact

If you have questions about image licensing or attribution, please contact the development team or refer to the original sources on Wikimedia Commons.

---

*This document ensures the Car Finder Game respects and complies with all applicable image licensing requirements.*