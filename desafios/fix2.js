const fs = require('fs');
let text = fs.readFileSync('exercicios.js', 'utf8');
let result = '';
let inString = false;
let escape = false;

for(let i = 0; i < text.length; i++){
    const c = text[i];
    if(inString){
        if(escape){
            result += c;
            escape = false;
        } else if(c === '\\\\') {
            result += c;
            escape = true;
        } else if(c === '"') {
            result += c;
            inString = false;
        } else if(c === '\\n') {
            result += '\\\\n';
        } else if(c === '\\r') {
            // ignore
        } else {
            result += c;
        }
    } else {
        if(c === '"') {
            inString = true;
            result += c;
        } else {
            result += c;
        }
    }
}

fs.writeFileSync('exercicios.js', result);
console.log('Done fixing string literals!');
