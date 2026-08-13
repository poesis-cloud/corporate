// One-off generator for public/og-default.png (1200x630 Open Graph image).
// Run: node scripts/generate-og-image.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="30%" cy="25%" r="90%">
      <stop offset="0%" stop-color="#101a30"/>
      <stop offset="55%" stop-color="#0a0f1c"/>
      <stop offset="100%" stop-color="#070a12"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#38bdf8"/>
  <text x="96" y="330" font-family="DejaVu Sans, Verdana, sans-serif" font-size="88" font-weight="bold" fill="#f3f6fc">Poesis</text>
  <text x="96" y="402" font-family="DejaVu Sans, Verdana, sans-serif" font-size="34" fill="#9fb0cc">Governed synthetic autopoiesis</text>
  <text x="96" y="470" font-family="DejaVu Sans, Verdana, sans-serif" font-size="26" fill="#64748b">Define the world in software; generate it.</text>
</svg>`;

// Logo art is dark; invert it so it stays visible on the dark background.
const logo = await sharp('public/poesis-logo.png')
  .resize(180, 180)
  .negate({ alpha: false })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, left: W - 180 - 96, top: 96 }])
  .png()
  .toFile('public/og-default.png');

console.log('Wrote public/og-default.png');
