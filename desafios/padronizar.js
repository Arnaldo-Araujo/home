const fs = require('fs');

// Carrega o conteúdo original de exercicios.js e eval para obter o array
let rawEx = fs.readFileSync('exercicios.js', 'utf8');
let tempSrc = rawEx.replace('const exercisesData', 'global.exercisesData');
eval(tempSrc);

let oldExercises = global.exercisesData;

// Mapeamento atual dos módulos antigos para sabermos quais exercícios pertencem a qual módulo
const oldRanges = [
    [0, 17],   // M1 (18)
    [18, 35],  // M2 (18)
    [36, 50],  // M3 (15)
    [51, 65],  // M4 (15)
    [66, 69],  // M5 (4)
    [70, 72],  // M6 (3)
    [73, 75],  // M7 (3)
    [76, 77],  // M8 (2)
    [78, 79],  // M9 (2)
    [80, 81],  // M10 (2)
    [82, 84]   // M11 (3)
];

let newExercises = [];
let newModulesConfig = [];

for (let m = 0; m < 11; m++) {
    let [start, end] = oldRanges[m];
    let numOld = end - start + 1;
    
    let startIndexForModule = m * 22;
    let endIndexForModule = startIndexForModule + 21;
    
    // Adiciona os antigos
    let currentNumber = 1;
    for (let i = start; i <= end; i++) {
        let ex = oldExercises[i];
        
        // Limpa o prefixo antigo ("Código 01-A:", "Código 10:", etc)
        let cleanTitle = ex.title;
        let match = cleanTitle.match(/^Código [0-9A-Z-]+:\s*(.*)/);
        if (match) {
            cleanTitle = match[1];
        } else if (cleanTitle.startsWith('Código')) {
            // Fallback se faltar dois pontos
            let splitted = cleanTitle.split(':');
            if (splitted.length > 1) cleanTitle = splitted.slice(1).join(':').trim();
        }

        let numStr = currentNumber.toString().padStart(2, '0');
        ex.title = "Código " + numStr + ": " + cleanTitle;
        
        newExercises.push(ex);
        currentNumber++;
    }
    
    // Preenche com placeholders até chegar em 22
    for (let i = currentNumber; i <= 22; i++) {
        let numStr = i.toString().padStart(2, '0');
        newExercises.push({
            title: "Código " + numStr + ": (Vago - Novo Exercício em Breve)",
            error_description: "Exercício a ser preenchido.",
            code: "// Área reservada para futuro exercício\\nint main() {\\n    return 0;\\n}",
            correction: "// Correção pendente"
        });
    }
}

// Gera o novo exercicios.js
let outJs = "const exercisesData = [\n";
let blocks = newExercises.map(ex => {
    let lines = JSON.stringify(ex, null, 4).split('\\n');
    return lines.map((l, i) => i === 0 ? "    " + l : "    " + l).join('\\n');
});
outJs += blocks.join(',\n');
outJs += "\n];\n";

fs.writeFileSync('exercicios.js', outJs, 'utf8');

// Atualiza o app.js
let appJs = fs.readFileSync('app.js', 'utf8');

// Troca os ranges no app.js de forma burra mas eficaz usando string replace
// Já sabemos a ordem exata do MODULES array:
let rangesToReplace = [
    [0, 17], [18, 35], [36, 50], [51, 65], [66, 69],
    [70, 72], [73, 75], [76, 77], [78, 79], [80, 81], [82, 84]
];

for (let m = 0; m < 11; m++) {
    let oldStr = "range: [" + rangesToReplace[m][0] + ", " + rangesToReplace[m][1] + "]";
    let newStr = "range: [" + (m * 22) + ", " + (m * 22 + 21) + "]";
    appJs = appJs.replace(oldStr, newStr);
}

fs.writeFileSync('app.js', appJs, 'utf8');

console.log('Sucesso! Total de exercícios agora:', newExercises.length);
