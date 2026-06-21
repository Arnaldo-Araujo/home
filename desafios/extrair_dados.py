import json
import re

def parse_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split the file into two parts: Codes and Explanations
    # Around line 700: "Parabéns por chegar até aqui! Completamos a nossa meta..."
    parts = re.split(r'Parabéns por chegar até aqui!', content)
    if len(parts) < 2:
        parts = [content, content] # Fallback
    
    code_section = parts[0]
    explanation_section = parts[1]

    # Extract codes
    # Pattern: Código XX: Title\n\n```c\n...\n```
    code_pattern = re.compile(r'(Código \d+:.*?)\n+```c\n(.*?)\n```', re.DOTALL)
    codes = code_pattern.findall(code_section)

    exercises = []
    
    for title, code_snippet in codes:
        # Extract title only
        code_id_match = re.search(r'(Código \d+)', title)
        if not code_id_match:
            continue
        code_id = code_id_match.group(1)
        
        # Find explanation in explanation_section
        # Pattern: Código XX: Title\n\n- O Erro: ...\n- Correção: ...
        # Look for the specific Código XX
        exp_pattern = re.compile(rf'{code_id}.*?\n\n- O Erro: (.*?)\n- Correção: (.*?)(?=\n\nCódigo|\Z)', re.DOTALL)
        exp_match = exp_pattern.search(explanation_section)
        
        error_desc = ""
        correction = ""
        if exp_match:
            error_desc = exp_match.group(1).strip()
            correction = exp_match.group(2).strip()
            
        exercises.append({
            "title": title.strip(),
            "code": code_snippet.strip(),
            "error_description": error_desc,
            "correction": correction
        })

    with open('exercicios.json', 'w', encoding='utf-8') as out:
        json.dump(exercises, out, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    parse_markdown('ErrosEmC.md')
    print("Dados extraídos com sucesso para exercicios.json!")
