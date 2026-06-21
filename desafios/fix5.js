const fs = require('fs');
let t = fs.readFileSync('exercicios.js', 'utf8');

let res = "";
let inStr = false;

for (let i = 0; i < t.length; i++) {
    let c = t[i];
    
    if (inStr) {
        if (c === '"') {
            // Count consecutive backslashes preceding the quote
            let backslashCount = 0;
            let j = i - 1;
            while (j >= 0 && t[j] === '\\') {
                backslashCount++;
                j--;
            }
            if (backslashCount % 2 === 0) {
                // The quote is NOT escaped (even number of backslashes means they escape each other)
                inStr = false;
            }
            res += c;
        } else if (c === '\n') {
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
console.log('Flawless parse done!');
