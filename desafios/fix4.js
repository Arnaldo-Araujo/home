const fs = require('fs');
let t = fs.readFileSync('exercicios.js', 'utf8');

// The file has a structure roughly like:
// "code": "some\n broken \n string",
// We want to replace it with:
// code: \`some\n broken \n string\`,

// We can just use a simple regex that matches "code": "..." and "correction": "..."
// Since the strings are broken across lines, a simple regex won't work easily if we don't know the end.
// But wait, the end of the string is always followed by `,` or `}`.

// Let's just fix the newlines manually. 
let res = "";
let inStr = false;
for (let i = 0; i < t.length; i++) {
    let c = t[i];
    if (inStr) {
        if (c === '"' && t[i-1] !== '\\') {
            inStr = false;
            res += c;
        } else if (c === '\n' && t[i-1] !== '\\') {
            // Unescaped newline inside string! Escape it.
            res += '\\n';
        } else if (c === '\r') {
            // Ignore \r
        } else {
            res += c;
        }
    } else {
        if (c === '"') {
            inStr = true;
        }
        res += c;
    }
}

fs.writeFileSync('exercicios.js', res);
console.log('Done!');
