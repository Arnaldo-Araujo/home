const fs = require('fs');
let t = fs.readFileSync('exercicios.js', 'utf8');

// Primeiro, removemos todos os \r pra evitar quebras invisíveis.
t = t.replace(/\r/g, '');

let res = '';
let inStr = false;
let esc = false;

for (let i = 0; i < t.length; i++) {
    let c = t[i];
    if (inStr) {
        if (esc) {
            res += c;
            esc = false;
        } else if (c === '\\\\') {
            res += c;
            esc = true;
        } else if (c === '"') {
            res += c;
            inStr = false;
        } else if (c === '\n') {
            res += '\\n';
        } else {
            res += c;
        }
    } else {
        if (c === '"') {
            inStr = true;
            res += c;
        } else {
            res += c;
        }
    }
}

fs.writeFileSync('exercicios.js', res);
console.log("Fix3 executado!");
