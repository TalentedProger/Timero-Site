/**
 * Generate Open Graph image (1200x630) for social media sharing
 * Run: npm run generate-opengraph
 */

const fs = require('fs');
const path = require('path');

console.log('📸 Open Graph Image Generator\n');

try {
  const sharp = require('sharp');
  
  const width = 1200;
  const height = 630;
  
  // Create SVG for Open Graph image
  const ogSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="clockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.95" />
          <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:0.95" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.4"/>
        </filter>
      </defs>
      
      <!-- Background gradient -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      
      <!-- Clock icon (centered, larger) -->
      <g transform="translate(300, 165)">
        <!-- Outer circle -->
        <circle cx="150" cy="150" r="140" fill="url(#clockGradient)" filter="url(#shadow)"/>
        
        <!-- Inner circle (clock face) -->
        <circle cx="150" cy="150" r="120" fill="#ffffff" opacity="0.98"/>
        
        <!-- Hour markers -->
        <g stroke="#667eea" stroke-width="6" stroke-linecap="round" opacity="0.6">
          <line x1="150" y1="40" x2="150" y2="55"/>
          <line x1="260" y1="150" x2="245" y2="150"/>
          <line x1="150" y1="260" x2="150" y2="245"/>
          <line x1="40" y1="150" x2="55" y2="150"/>
        </g>
        
        <!-- Hour hand -->
        <line x1="150" y1="150" x2="150" y2="90" 
              stroke="#667eea" 
              stroke-width="8" 
              stroke-linecap="round"
              transform="rotate(-60 150 150)"/>
        
        <!-- Minute hand -->
        <line x1="150" y1="150" x2="150" y2="70" 
              stroke="#667eea" 
              stroke-width="6" 
              stroke-linecap="round"
              transform="rotate(60 150 150)"/>
        
        <!-- Center dot -->
        <circle cx="150" cy="150" r="10" fill="#667eea"/>
        <circle cx="150" cy="150" r="5" fill="#ffffff"/>
      </g>
      
      <!-- Text content -->
      <text x="650" y="220" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="start">
        Premium Focus Timer
      </text>
      <text x="650" y="290" font-family="Arial, sans-serif" font-size="36" fill="#ffffff" opacity="0.95" text-anchor="start">
        Таймер Помодоро
      </text>
      <text x="650" y="340" font-family="Arial, sans-serif" font-size="36" fill="#ffffff" opacity="0.95" text-anchor="start">
        для Продуктивности
      </text>
      
      <!-- Features -->
      <g transform="translate(650, 400)">
        <text x="0" y="0" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" opacity="0.9">
          ✓ Настраиваемые таймеры
        </text>
        <text x="0" y="40" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" opacity="0.9">
          ✓ Красивые фоны и звуки
        </text>
        <text x="0" y="80" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" opacity="0.9">
          ✓ Статистика продуктивности
        </text>
      </g>
      
      <!-- Domain -->
      <text x="600" y="590" font-family="Arial, sans-serif" font-size="32" font-weight="600" fill="#ffffff" text-anchor="middle">
        timero.ru
      </text>
    </svg>
  `;
  
  const outputPath = path.join(__dirname, 'public', 'opengraph.jpg');
  
  sharp(Buffer.from(ogSvg))
    .jpeg({ quality: 90 })
    .toFile(outputPath)
    .then(() => {
      console.log('✅ Open Graph image generated successfully!\n');
      console.log(`  Output: public/opengraph.jpg`);
      console.log(`  Size: ${width}x${height}px`);
      console.log('\n📝 This image will be used when sharing on:');
      console.log('  - Facebook');
      console.log('  - Twitter');
      console.log('  - LinkedIn');
      console.log('  - VK');
      console.log('  - Telegram');
      console.log('\n✓ index.html already configured to use this image');
    })
    .catch(err => {
      console.error('❌ Error generating Open Graph image:', err.message);
      console.error('\nTroubleshooting:');
      console.error('  1. Make sure sharp is installed: npm install');
      console.error('  2. Try reinstalling: npm install --save-dev sharp');
    });
  
} catch (err) {
  console.error('❌ Sharp library not found!\n');
  console.log('Please install sharp first:');
  console.log('  npm install --save-dev sharp\n');
  console.log('Then run again:');
  console.log('  npm run generate-opengraph');
  process.exit(1);
}
