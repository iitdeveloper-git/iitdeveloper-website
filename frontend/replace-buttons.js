const fs = require('fs');
const path = require('path');

function getFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(getFiles(file, ext));
    } else { 
      if (file.endsWith(ext)) results.push(file);
    }
  });
  return results;
}

const files = [
  ...getFiles('./src/app/about', '.tsx'),
  ...getFiles('./src/app/careers', '.tsx'),
  ...getFiles('./src/app/team', '.tsx'),
  ...getFiles('./src/app/services', '.tsx'),
  ...getFiles('./src/components/sections', '.tsx'),
  './src/app/estimate/[id]/page.tsx'
];

let replacedCount = 0;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/variant="outline"/g, 'variant="neon"');
    content = content.replace(/variant="glass"/g, 'variant="neon"');
    
    // Explicit exact match replacements for the custom button borders
    content = content.replace(/className="border-primary\/30 hover:border-primary\/60 hover:shadow-glow"/g, 'className=""');
    content = content.replace(/className="border-secondary\/30 hover:border-secondary\/60 hover:shadow-glow-yellow"/g, 'className=""');
    content = content.replace(/className="border-white\/10 hover:bg-white\/5"/g, 'className=""');

    if (content !== original) {
      fs.writeFileSync(file, content);
      replacedCount++;
      console.log(`Updated ${file}`);
    }
  }
});

console.log(`Replaced buttons in ${replacedCount} files.`);
