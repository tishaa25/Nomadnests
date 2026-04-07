const fs = require('fs');
const path = require('path');
const fileP = path.join(__dirname, '../src/NomadNests.jsx');
let content = fs.readFileSync(fileP, 'utf-8');

// Names
content = content.replace(/NestWork India/g, "NomadNests");
content = content.replace(/NestWork Pass/g, "Nomad Pass");

// Styles
content = content.replace(/ color: #0A1628;/g, "");
content = content.replace(/\.btn-accent \{.*?\}\n/g, "");
content = content.replace(/\.btn-accent:hover \{.*?\}\n/g, "");

// Tailwind Classes
content = content.replace(/bg-\[#0A1628\]/g, "bg-slate-900");
content = content.replace(/text-\[#0A1628\]/g, "text-slate-900");
content = content.replace(/border-\[#0A1628\]/g, "border-slate-900");

content = content.replace(/from-\[#FF6B35\]/g, "from-emerald-400");
content = content.replace(/to-\[#FF6B35\]/g, "to-emerald-400");
content = content.replace(/text-\[#FF6B35\]/g, "text-emerald-500");
content = content.replace(/bg-\[#FF6B35\]/g, "bg-emerald-500");
content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-500/g, "text-emerald-400");

content = content.replace(/btn-accent/g, "btn-primary");

fs.writeFileSync(fileP, content);
console.log("Reverted colors and brand name.");
