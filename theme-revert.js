import fs from 'fs';
const file = 'src/NomadNests.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. REVERT COLORS (Teal -> Emerald)
content = content.replace(/teal/g, 'emerald');
content = content.replace(/#0d9488/g, '#10b981'); 
content = content.replace(/#0f766e/g, '#059669'); 
content = content.replace(/#115e59/g, '#047857'); 
content = content.replace(/13,148,136/g, '16,185,129'); 

// 2. REVERT HERO
content = content.replace(/rgba\(255,255,255,0.65\) 0%, rgba\(255,255,255,0.95\) 60%/g, "rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.35) 60%");
content = content.replace(/text-slate-900 leading-\[1.08\]/g, "text-white leading-[1.08]");
content = content.replace(/text-slate-600 text-lg font-medium/g, "text-white/75 text-lg");
content = content.replace(/bg-white\/80 backdrop-blur-xl border border-slate-200 text-slate-800/g, "glass text-white/90");
content = content.replace(/bg-white border border-slate-200 text-slate-700 text-xs px-4 py-1\.5 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm/g, "glass text-white/85 text-xs px-4 py-1.5 rounded-full hover:bg-white/20 transition-all");

// 3. REVERT STATS BANNER
content = content.replace(/bg-white border-y border-slate-100/g, "bg-slate-900 border-b border-white/5");
content = content.replace(/text-slate-900 mb-1 tracking-tight/g, "text-white mb-1 tracking-tight");
content = content.replace(/text-slate-500 text-sm font-medium tracking-wide/g, "text-white/50 text-sm font-medium tracking-wide");
content = content.replace(/bg-slate-100 group-hover:bg-emerald-500\/20 transition-colors flex items-center justify-center mb-3 text-emerald-600/g, "bg-white/5 group-hover:bg-emerald-500/20 transition-colors flex items-center justify-center mb-3 text-emerald-400"); // Fix icon circle

// 4. REVERT SECURITY VAULT
content = content.replace(/id="security" className="py-20 bg-slate-50"/g, 'id="security" className="py-20 bg-slate-900"');
content = content.replace(/<h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3 mt-4">/g, '<h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 mt-4">');
content = content.replace(/<p className="text-slate-500 max-w-md mx-auto">/g, '<p className="text-white/50 max-w-md mx-auto">');
content = content.replace(/border-slate-200 bg-white/g, "border-white/8 bg-white/5");
content = content.replace(/text-slate-900 font-semibold text-lg/g, "text-white font-semibold text-lg");
content = content.replace(/text-slate-500 text-sm leading-relaxed/g, "text-white/50 text-sm leading-relaxed");
content = content.replace(/text-slate-400 text-xs mt-3/g, "text-white/30 text-xs mt-3");

// 5. REVERT FOOTER
content = content.replace(/text-slate-900">NomadNests<\/span>/g, 'text-white">NomadNests</span>');
content = content.replace(/text-slate-500 text-xs">/g, 'text-white/40 text-xs">');

// 6. REVERT SMART PASS
content = content.replace(/text-slate-900 mb-6 leading-tight/g, 'text-white mb-6 leading-tight');
content = content.replace(/<p className="text-slate-600 mb-8 leading-relaxed/g, '<p className="text-white/60 mb-8 leading-relaxed');
content = content.replace(/text-slate-700 text-sm bg-slate-100/g, 'text-white/80 text-sm bg-white/5');
content = content.replace(/text-emerald-600 border-emerald-200 text-sm font-bold bg-slate-100/g, 'text-emerald-400 text-sm font-bold bg-white/5'); // pills

// 7. REVERT TOAST & PLAN CARDS & MISC
content = content.replace(/bg-white border border-slate-200 text-slate-900 px-6 py-3\.5/g, 'bg-slate-900 text-white px-6 py-3.5 border-none');
content = content.replace(/color: "bg-emerald-600 border-emerald-600",\n    textColor: "text-white",\n    btnClass: "bg-slate-900 text-white hover:bg-slate-800 transition-colors"/g, 'color: "bg-slate-900 border-slate-900",\n    textColor: "text-white",\n    btnClass: "btn-primary text-white"');

// Fix badges & listing pills
content = content.replace(/bg-slate-50\/85 text-slate-900/g, 'bg-slate-900/85 text-white');
content = content.replace(/bg-slate-50\/80 backdrop-blur-sm text-slate-900/g, 'bg-slate-900/80 backdrop-blur-sm text-white');

// Fix text-white/50 logic in toast replacement
content = content.replace(/className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"/g, 'className="ml-2 text-white/50 hover:text-white transition-colors"');

fs.writeFileSync(file, content);
console.log('Successfully reverted to ORIGINAL Emerald + Slate-Navy aesthetics!');
