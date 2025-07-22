# Banner Image Instructions

## To add your custom banner:

1. **Place your banner image** in this folder (`img/`) and name it `banner.png`
   - Alternatively, you can name it something else and update the `src` attribute in `index.html`

2. **Recommended specifications:**
   - **Format:** PNG, JPG, or SVG
   - **Width:** 800-1200px (will auto-scale responsively)
   - **Height:** 150-250px 
   - **Aspect ratio:** Wide/landscape orientation works best
   - **File size:** Under 500KB for fast loading

3. **Current setup:**
   - The HTML expects: `img/banner.png`
   - If the image fails to load, it will show "Pokemonics" as fallback text with retro styling
   - The banner is responsive and will scale appropriately on mobile devices

4. **To change the image path:**
   - Edit `index.html` line containing: `<img src="img/banner.png"`
   - Change `banner.png` to your actual filename

## Current Features:
- ✅ Responsive design (scales on mobile)
- ✅ Hover effects (slight zoom and enhanced shadow)
- ✅ Fallback text if image fails to load
- ✅ Proper alt text for accessibility
- ✅ Optimized loading and error handling
