const fs = require('fs');
let t = fs.readFileSync('exercicios.js', 'utf8');

// Replace the literal string "[\n" (4 chars: [, \, n) with "[\n" (2 chars: [, newline)
t = t.split('[\\n').join('[\n');
t = t.split(',\\n').join(',\n');
t = t.split('\\n];\\n').join('\n];\n');

fs.writeFileSync('exercicios.js', t);
console.log('Fixed!');
