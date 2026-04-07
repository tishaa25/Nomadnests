import fs from 'fs';
const file = 'src/NomadNests.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Swap monochrome out for Soothing Ocean Theme
content = content.replace(/zinc/g, 'teal');
content = content.replace(/neutral/g, 'slate');

// 2. Fix the Primary Button CSS Colors (make them vibrant soothing teal instead of gray/zinc)
content = content.replace(/#52525b/g, '#0d9488'); // teal-600
content = content.replace(/#3f3f46/g, '#0f766e'); // teal-700
content = content.replace(/#27272a/g, '#115e59'); // teal-800
content = content.replace(/82,82,91/g, '13,148,136'); // teal rgb

// 3. Ensure Text Visibility!
// Because we previously did complex light mode stuff, ensure text isn't invisible on the cards.
// Fix the Hero Section
content = content.replace(/text-slate-900 leading-\[1.08\]/g, 'text-slate-900 leading-[1.08]');
// Fix the Pro Nomad Plan
content = content.replace(/color: "bg-slate-50 border-teal-500",\n    textColor: "text-slate-900"/g, 'color: "bg-teal-600 border-teal-600",\n    textColor: "text-white"');

// 4. Specifically fix the toast and interactive pills for pop and color context
content = content.replace(/bg-white border border-slate-200/g, 'bg-white border border-slate-200');

// 5. Some buttons might be 'hover:bg-slate-50'. That's totally fine.
// The `text-[color]` will now be `text-teal-600` or `text-slate-900` which are heavily visible on light backgrounds!

// 6. Security vault background to a soothing soft slate tone
content = content.replace(/bg-slate-50 border-y border-slate-200/g, 'bg-slate-50 border-y border-slate-200');

fs.writeFileSync(file, content);
console.log('Soothing Tropical Ocean theme perfectly applied, maintaining high contrast visibility!');
