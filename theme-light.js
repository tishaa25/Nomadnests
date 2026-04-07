import fs from 'fs';
const file = 'src/NomadNests.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix the hilarious `translate` -> `transtone` -> `tranneutral` bug
content = content.replace(/tranneutral/g, 'translate');

// 2. HERO SECTION Light Mode
content = content.replace(/rgba\(2,6,23,0\.55\) 0%, rgba\(2,6,23,0\.35\) 60%/g, "rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.95) 60%");
content = content.replace(/text-white leading-\[1.08\]/g, "text-neutral-900 leading-[1.08]");
content = content.replace(/text-white\/75 text-lg/g, "text-neutral-600 text-lg font-medium");
content = content.replace(/glass text-white\/90/g, "bg-white/80 backdrop-blur-xl border border-neutral-200 text-neutral-800");

// Hero pills
content = content.replace(/className="glass text-white\/85 text-xs px-4 py-1.5 rounded-full hover:bg-white\/20 transition-all"/g, 'className="bg-white border border-neutral-200 text-neutral-700 text-xs px-4 py-1.5 rounded-full hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm"');

// 3. STATS BANNER Light Mode
content = content.replace(/bg-neutral-900 border-b border-white\/5/g, "bg-white border-y border-neutral-100");
content = content.replace(/text-white mb-1 tracking-tight/g, "text-neutral-900 mb-1 tracking-tight");
content = content.replace(/text-white\/50 text-sm font-medium tracking-wide/g, "text-neutral-500 text-sm font-medium tracking-wide");

// 4. SECURITY VAULT Light Mode
content = content.replace(/bg-neutral-900/g, "bg-neutral-50");
content = content.replace(/<h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 mt-4">The NomadNests Security Vault™<\/h2>\s*<p className="text-white\/50/g, '<h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-3 mt-4">The NomadNests Security Vault™</h2>\n            <p className="text-neutral-500');
content = content.replace(/border-white\/8 bg-white\/5/g, "border-neutral-200 bg-white");
content = content.replace(/text-white font-semibold text-lg/g, "text-neutral-900 font-semibold text-lg");
content = content.replace(/text-white\/50 text-sm leading-relaxed/g, "text-neutral-500 text-sm leading-relaxed");
content = content.replace(/text-white\/30 text-xs mt-3/g, "text-neutral-400 text-xs mt-3");

// 5. FOOTER Light Mode
content = content.replace(/<span className="font-display text-base font-bold text-white">NomadNests<\/span>/g, '<span className="font-display text-base font-bold text-neutral-900">NomadNests</span>');
content = content.replace(/<p className="text-white\/40 text-xs">/g, '<p className="text-neutral-500 text-xs">');
content = content.replace(/text-white\/40/g, 'text-neutral-400');

fs.writeFileSync(file, content);
console.log('Light Mode applied globally!');
