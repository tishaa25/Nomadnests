import fs from 'fs';
const file = 'src/NomadNests.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace vibrant/harsh colors with soft, minimal monochromatic palette
content = content.replace(/amber/g, 'zinc');
content = content.replace(/stone/g, 'neutral');

// Replace the primary button hex gradients (which were bright amber) with elegant dark zinc gradients
content = content.replace(/#d97706/g, '#52525b'); // zinc-600
content = content.replace(/#b45309/g, '#3f3f46'); // zinc-700
content = content.replace(/#92400e/g, '#27272a'); // zinc-800
content = content.replace(/217,119,6/g, '82,82,91'); // zinc rgb

// Fix an issue where the hero mesh gradient looks muddy with zinc; make it a very subtle pure white/gray mesh
content = content.replace(/from-zinc-[0-9]+\/80/g, 'from-neutral-800/80');

fs.writeFileSync(file, content);
console.log('Minimalist soothing aesthetic applied successfully.');
