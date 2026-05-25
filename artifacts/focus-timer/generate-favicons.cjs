/**
 * Generate PNG favicons from SVG
 * Run: npm run generate-favicons
 */

const fs = require('fs');
const path = require('path');

// Read the SVG file
const svgPath = path.join(__dirname, 'public', 'favicon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

console.log('📦 Favicon Generator for Premium Focus Timer\n');
console.log('SVG source:', svgPath);

// Try to use sharp
try {
  const sharp = require('sharp');
  
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
  ];
  
  const publicDir = path.join(__dirname, 'public');
  
  console.log('✅ Sharp library found! Generating PNG favicons...\n');
  
  Promise.all(
    sizes.map(({ size, name }) => {
      const outputPath = path.join(publicDir, name);
      return sharp(Buffer.from(svgContent))
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath)
        .then(() => {
          console.log(`  ✓ ${name} (${size}x${size})`);
        });
    })
  ).then(() => {
    console.log('\n✅ All PNG favicons generated successfully!\n');
    console.log('Generated files:');
    sizes.forEach(({ name }) => {
      console.log(`  - public/${name}`);
    });
    console.log('\n📝 Next steps:');
    console.log('  1. Favicons are ready to use');
    console.log('  2. index.html already configured with favicon links');
    console.log('  3. Deploy to Vercel to see them in action');
    console.log('\n💡 Optional: Generate favicon.ico for legacy browsers');
    console.log('   Use: https://favicon.io/favicon-converter/');
  }).catch(err => {
    console.error('\n❌ Error generating favicons:', err.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Make sure sharp is installed: npm install');
    console.error('  2. Check SVG file exists: public/favicon.svg');
    console.error('  3. Try reinstalling: npm install --save-dev sharp');
  });
  
} catch (err) {
  console.error('❌ Sharp library not found!\n');
  console.log('Please install sharp first:');
  console.log('  npm install --save-dev sharp\n');
  console.log('Then run again:');
  console.log('  npm run generate-favicons\n');
  console.log('OR use an online converter:');
  console.log('  - https://realfavicongenerator.net/');
  console.log('  - https://favicon.io/favicon-converter/');
  console.log('\nRequired sizes: 16x16, 32x32, 180x180, 192x192, 512x512');
  process.exit(1);
}
