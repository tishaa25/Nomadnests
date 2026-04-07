import fs from 'fs';
const file = 'src/NomadNests.jsx';
let content = fs.readFileSync(file, 'utf8');

// The Pro Nomad Plan text visibility
content = content.replace(/color: "bg-neutral-50 border-neutral-900",\s*textColor: "text-white"/g, 'color: "bg-neutral-50 border-zinc-500",\n    textColor: "text-neutral-900"');

// The Team Hub plan text visibility
content = content.replace(/btnClass: "btn-primary text-white"/g, 'btnClass: "btn-primary text-white"'); // Buttons are fine since btn-primary is dark gray

// TOAST visibility (was bg-neutral-50 with text-white)
content = content.replace(/bg-neutral-50 text-white px-6 py-3\.5 rounded-2xl shadow-2xl/g, 'bg-white border border-neutral-200 text-neutral-900 px-6 py-3.5 rounded-2xl shadow-xl');
content = content.replace(/text-white\/50 hover:text-white transition-colors/g, 'text-neutral-400 hover:text-neutral-800 transition-colors');

// MODAL visibility (text-white on what might be light bg now)
content = content.replace(/text-white mb-2/g, 'text-neutral-900 mb-2');
content = content.replace(/text-white\/70/g, 'text-neutral-600');
content = content.replace(/className="text-white text-center/g, 'className="text-neutral-900 text-center');
content = content.replace(/text-white font-bold text-2xl/g, 'text-neutral-900 font-bold text-2xl');

// CITIES visibility fixing (`text-white` on the city cards is OK because it's a dark gradient, but we can make it pop more by adding drop-shadow)
content = content.replace(/text-white font-semibold text-sm/g, 'text-white font-semibold text-sm drop-shadow-md');

// SMART PASS INNER CARD visibility
// Ensure we didn't break the Smart Pass card text
content = content.replace(/text-neutral-400 text-\[10px\] mb-1 uppercase/g, 'text-neutral-400 text-[10px] mb-1 uppercase'); // Keep this, it is fine inside the black card.

// FINAL CATCH-ALL: Sometimes people click 'login' and the modal is totally white. Let's fix modal overlay text if any.
content = content.replace(/bg-neutral-50\/40 backdrop-blur-md/g, 'bg-zinc-900/40 backdrop-blur-md'); // Modal backdrop shouldn't be white
content = content.replace(/bg-neutral-50 rounded-3xl p-8 relative/g, 'bg-white rounded-3xl p-8 relative border border-neutral-200 shadow-2xl');

fs.writeFileSync(file, content);
console.log('Final text visibility corrections applied!');
