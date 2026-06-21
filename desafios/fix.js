const fs = require('fs');
let text = fs.readFileSync('exercicios.js', 'utf8');

// The issue is literal ",\n" outside strings
let result = '';
let inString = false;
let escape = false;

for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inString) {
        result += c;
        if (escape) {
            escape = false;
        } else if (c === '\\') {
            escape = true;
        } else if (c === '"') {
            inString = false;
        }
    } else {
        if (c === '"') {
            inString = true;
            result += c;
        } else if (c === '\\' && text[i+1] === 'n') {
            // It's a literal \n outside string! This is the syntax error.
            // Replace it with an actual newline.
            result += '\n';
            i++; // skip 'n'
        } else {
            result += c;
        }
    }
}

fs.writeFileSync('exercicios.js', result);
console.log('Fixed syntax!');
