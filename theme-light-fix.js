import fs from 'fs';
const file = 'src/NomadNests.jsx';
let content = fs.readFileSync(file, 'utf8');

// Listing card badges (white on white fix)
// Was: <span className="bg-neutral-50/85 text-white
content = content.replace(/className="bg-neutral-50\/85 text-white/g, 'className="bg-neutral-50/85 text-neutral-900');
// Was: <span className="bg-neutral-50/80 backdrop-blur-sm text-white
content = content.replace(/className="bg-neutral-50\/80 backdrop-blur-sm text-white/g, 'className="bg-neutral-50/80 backdrop-blur-sm text-neutral-900');

// Smart pass background text issue (white on white fix)
content = content.replace(/<h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">/g, '<h2 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mb-6 leading-tight">');
content = content.replace(/<p className="text-white\/60 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">/g, '<p className="text-neutral-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">');

// Smart pass pills
content = content.replace(/text-white\/80 text-sm bg-white\/5/g, 'text-neutral-700 text-sm bg-neutral-100');
content = content.replace(/text-zinc-400 text-sm font-bold bg-white\/5/g, 'text-zinc-600 border-zinc-200 text-sm font-bold bg-neutral-100');

fs.writeFileSync(file, content);
console.log('Fixed invisible text on white backgrounds!');
