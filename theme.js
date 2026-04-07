import fs from 'fs';
const file = 'src/NomadNests.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Theme replacements: Beige and Brown
content = content.replace(/emerald/g, 'amber');
content = content.replace(/slate/g, 'stone');
content = content.replace(/#10b981/g, '#d97706'); // amber-600
content = content.replace(/#059669/g, '#b45309'); // amber-700
content = content.replace(/#047857/g, '#92400e'); // amber-800
content = content.replace(/16,185,129/g, '217,119,6'); // amber rgb

// 3. Update all LISTING images to guaranteed high-res Unsplash links
const safeImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1c2c44040a?w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
];

let imgIndex = 0;
content = content.replace(/image: "[^"]+"/g, () => {
  const newImg = 'image: "' + safeImages[imgIndex] + '"';
  imgIndex = (imgIndex + 1) % safeImages.length;
  return newImg;
});

fs.writeFileSync(file, content);
console.log('Theme changed to beige/brown and photos updated.');
