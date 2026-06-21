const exercisesData = [
    // ═══════════════════════════════════════════
    //  MÓDULO 1: Fundamentos da Linguagem C
    // ═══════════════════════════════════════════

    // --- Original 01 ---
    {
        "title": "Código 01: Entrada de dados",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint idade;\n\nprintf(\"Digite sua idade: \");\n\nscanf(\"%d\", idade); \n\nprintf(\"Voce tem %d anos.\\n\", idade);\n\nreturn 0;\n\n}",
        "error_description": "Na função scanf, faltou o operador de endereço & antes da variável idade. O scanf precisa saber o endereço de memória onde deve guardar o valor lido.",
        "correction": "scanf(\"%d\", &idade);"
    },

    // --- Intermediário 01-A ---
    {
        "title": "Código 01-A: Leitura de ponto flutuante",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nfloat preco;\n\nprintf(\"Digite o preco do produto: \");\n\nscanf(\"%f\", preco);\n\nprintf(\"O preco informado foi: %.2f\\n\", preco);\n\nreturn 0;\n\n}",
        "error_description": "Assim como no scanf para inteiros, ao ler um float também é obrigatório passar o endereço da variável com o operador &. Sem ele, o comportamento é indefinido e o programa pode travar.",
        "correction": "scanf(\"%f\", &preco);"
    },

    // --- Intermediário 01-B ---
    {
        "title": "Código 01-B: Especificador de formato errado",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nchar letra;\n\nprintf(\"Digite uma letra: \");\n\nscanf(\"%d\", &letra);\n\nprintf(\"A letra digitada foi: %c\\n\", letra);\n\nreturn 0;\n\n}",
        "error_description": "O especificador %d é usado para inteiros. Para ler um único caractere com scanf, o especificador correto é %c. Usar %d vai interpretar o caractere como um número inteiro, gerando comportamento incorreto.",
        "correction": "scanf(\"%c\", &letra);"
    },

    // --- Original 02 ---
    {
        "title": "Código 02: Comentários",
        "code": "#include <stdio.h>\n\nint main(void) {\n\n/* Imprime uma mensagem de boas-vindas na tela\ne finaliza o programa\n\nprintf(\"Bem-vindo a C!\\n\");\n\nreturn 0;\n\n}",
        "error_description": "O bloco de comentário não foi fechado. Utilizou-se /* para iniciar o comentário de múltiplas linhas, mas esqueceu-se de o fechar com */. O compilador vai ignorar o resto do código.",
        "correction": "/* Imprime uma mensagem de boas-vindas na tela\ne finaliza o programa */"
    },

    // --- Intermediário 02-A ---
    {
        "title": "Código 02-A: Comentário de linha dentro de string",
        "code": "#include <stdio.h>\n\nint main(void) {\n\n// Imprime o resultado\nprintf(\"O resultado e: // importante\\n\");\n\nreturn 0;\n\n}",
        "error_description": "Este código está sintaticamente correto! O // dentro de uma string literal não é tratado como comentário pelo compilador — é apenas texto. O erro conceitual seria achar que ele 'comenta' algo dentro de printf. Preste atenção: comentários de linha só funcionam fora de strings.",
        "correction": "printf(\"O resultado e: // importante\\n\");"
    },

    // --- Intermediário 02-B ---
    {
        "title": "Código 02-B: Comentário aninhado",
        "code": "#include <stdio.h>\n\nint main(void) {\n\n/* Calcula a media\n/* dos alunos */\ndo semestre */\n\nfloat media = 7.5;\nprintf(\"Media: %.1f\\n\", media);\n\nreturn 0;\n\n}",
        "error_description": "Em C, comentários de bloco /* ... */ não podem ser aninhados. O primeiro */ encontrado fecha o comentário aberto pelo primeiro /*. Isso faz com que 'do semestre */' fique fora do comentário e cause erro de compilação.",
        "correction": "/* Calcula a media\n   dos alunos\n   do semestre */"
    },

    // --- Original 03 ---
    {
        "title": "Código 03: Controle de Formato",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint numero = 42;\n\nprintf(\"O valor da variavel e d\\n\", numero);\n\nreturn 0;\n\n}",
        "error_description": "O especificador de formato para um número inteiro é %d. No código, está apenas um d perdido no meio da string, o que fará com que imprima literalmente a letra \"d\".",
        "correction": "printf(\"O valor da variavel e %d\\n\", numero);"
    },

    // --- Intermediário 03-A ---
    {
        "title": "Código 03-A: Formato para número grande",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nlong long int populacao = 8100000000LL;\n\nprintf(\"Populacao mundial: %d\\n\", populacao);\n\nreturn 0;\n\n}",
        "error_description": "O especificador %d é para inteiros do tipo int (geralmente 32 bits). Para long long int, que pode armazenar valores muito maiores, é obrigatório usar %lld. Usar %d causará truncamento e exibirá um valor incorreto.",
        "correction": "printf(\"Populacao mundial: %lld\\n\", populacao);"
    },

    // --- Intermediário 03-B ---
    {
        "title": "Código 03-B: Impressão de string vs. char",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nchar nome[] = \"Carlos\";\n\nprintf(\"Nome: %c\\n\", nome);\n\nreturn 0;\n\n}",
        "error_description": "O especificador %c imprime um único caractere. Para imprimir uma cadeia de caracteres (string/array de char), o especificador correto é %s. Usar %c com um array imprimirá um caractere aleatório ou causará comportamento indefinido.",
        "correction": "printf(\"Nome: %s\\n\", nome);"
    },

    // --- Original 04 ---
    {
        "title": "Código 04: Tomada de Decisão",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint a = 5;\n\n// Verifica se 'a' é igual a 10\n\nif (a = 10) {\n\nprintf(\"A e igual a 10!\\n\");\n\n} else {\n\nprintf(\"A e diferente de 10!\\n\");\n\n}\n\nreturn 0;\n\n}",
        "error_description": "Na instrução if (a = 10), está a ser feita uma atribuição (colocar o valor 10 em a) em vez de uma comparação. Como em C qualquer valor diferente de zero é verdadeiro, o bloco if será sempre executado.",
        "correction": "if (a == 10)"
    },

    // --- Intermediário 04-A ---
    {
        "title": "Código 04-A: Comparação com zero",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint saldo = 0;\n\nif (saldo = 0) {\nprintf(\"Saldo zerado!\\n\");\n} else {\nprintf(\"Saldo disponivel.\\n\");\n}\n\nreturn 0;\n\n}",
        "error_description": "Aqui o erro é duplamente traiçoeiro: if (saldo = 0) atribui 0 a saldo, e como 0 é falso em C, o bloco else sempre executa — o oposto do esperado. Nunca use = dentro de uma condição if quando quer comparar.",
        "correction": "if (saldo == 0)"
    },

    // --- Intermediário 04-B ---
    {
        "title": "Código 04-B: Else pendurado (Dangling Else)",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint x = 10;\nint y = 20;\n\nif (x > 5)\n    if (y > 15)\n        printf(\"y e maior que 15\\n\");\nelse\n    printf(\"x nao e maior que 5\\n\");\n\nreturn 0;\n\n}",
        "error_description": "Em C, o else sempre se associa ao if mais próximo. Aqui o else está recuado como se pertencesse ao if (x > 5), mas na prática pertence ao if (y > 15). O programa não se comporta como a indentação sugere. Use chaves {} para tornar a intenção explícita.",
        "correction": "if (x > 5) {\n    if (y > 15)\n        printf(\"y e maior que 15\\n\");\n} else {\n    printf(\"x nao e maior que 5\\n\");\n}"
    },

    // --- Original 05 ---
    {
        "title": "Código 05: Conceitos de Memória e Inicialização",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint soma;\n\nint valor = 10;\n\nsoma = soma + valor;\n\nprintf(\"O resultado da soma e: %d\\n\", soma);\n\nreturn 0;\n\n}",
        "error_description": "A variável soma foi declarada mas nunca inicializada. Em C, isso significa que ela conterá \"lixo de memória\" (um valor aleatório). Ao fazer soma = soma + valor;, o resultado será imprevisível.",
        "correction": "int soma = 0;"
    },

    // --- Intermediário 05-A ---
    {
        "title": "Código 05-A: Acumulador não zerado",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint i;\nint contador;\n\nfor (i = 0; i < 5; i++) {\n    contador++;\n}\n\nprintf(\"Contei %d vezes\\n\", contador);\n\nreturn 0;\n\n}",
        "error_description": "A variável contador não foi inicializada antes do loop. O operador ++ incrementa o valor atual, mas se o valor inicial é lixo de memória, o resultado final será imprevisível. Todo acumulador ou contador deve ser inicializado antes de ser usado.",
        "correction": "int contador = 0;"
    },

    // --- Intermediário 05-B ---
    {
        "title": "Código 05-B: Flag booleana sem valor inicial",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint encontrado;\nint vetor[] = {3, 7, 2, 9, 5};\nint alvo = 9;\n\nfor (int i = 0; i < 5; i++) {\n    if (vetor[i] == alvo) {\n        encontrado = 1;\n    }\n}\n\nif (encontrado) {\n    printf(\"Elemento encontrado!\\n\");\n} else {\n    printf(\"Elemento nao encontrado.\\n\");\n}\n\nreturn 0;\n\n}",
        "error_description": "A variável encontrado serve como flag booleana, mas não foi inicializada. Se o elemento não for encontrado, o loop termina sem atribuir valor algum, e o if (encontrado) lê lixo de memória — podendo imprimir 'Elemento encontrado!' erroneamente.",
        "correction": "int encontrado = 0;"
    },

    // --- Original 06 ---
    {
        "title": "Código 06: Aspas Duplas",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nprintf(Ola, Mundo da Programacao!\\n);\n\nreturn 0;\n\n}",
        "error_description": "Textos (strings literais) passados para a função printf precisam obrigatoriamente de estar entre aspas duplas \" \".",
        "correction": "printf(\"Ola, Mundo da Programacao!\\n\");"
    },

    // --- Intermediário 06-A ---
    {
        "title": "Código 06-A: Aspas simples em lugar de duplas",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nchar *linguagem = 'C Programming';\n\nprintf(\"Linguagem: %s\\n\", linguagem);\n\nreturn 0;\n\n}",
        "error_description": "Em C, aspas simples ' ' delimitam um único caractere (char), não uma string. Para inicializar um ponteiro de char com uma string literal, é obrigatório usar aspas duplas \" \". 'C Programming' é inválido pois tem mais de um caractere.",
        "correction": "char *linguagem = \"C Programming\";"
    },

    // --- Intermediário 06-B ---
    {
        "title": "Código 06-B: Caractere de escape incorreto",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nprintf(\"Linha 1\\nLinha 2\\tTabulado\\nCaminho: C:\\users\\nome\\n\");\n\nreturn 0;\n\n}",
        "error_description": "Dentro de strings em C, a barra invertida \\ inicia uma sequência de escape (\\n = nova linha, \\t = tabulação). Em 'C:\\users\\nome', o \\u e \\n serão interpretados como sequências de escape inválidas ou incorretas. Para representar uma barra invertida literal, é necessário escapá-la como \\\\.",
        "correction": "printf(\"Caminho: C:\\\\users\\\\nome\\n\");"
    },

    // ═══════════════════════════════════════════
    //  MÓDULO 2: Alocação Dinâmica e Ponteiros
    // ═══════════════════════════════════════════

    // --- Original 07 ---
    {
        "title": "Código 07: Omissão de tamanho correto",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\nint *vetor;\n\n/* Tenta alocar memória para um vetor de 5 números inteiros */\n\nvetor = (int *) malloc(5); \n\nfor(int i = 0; i < 5; i++) {\n\nvetor[i] = i * 10;\n\nprintf(\"%d \", vetor[i]);\n\n}\n\nfree(vetor);\n\nreturn 0;\n\n}",
        "error_description": "malloc(5) aloca apenas 5 bytes de memória. Um inteiro (int) normalmente ocupa 4 bytes. Ao tentar aceder a vetor[1] em diante, o programa estará a invadir memória não alocada (buffer overflow), causando corrupção ou Segmentation Fault.",
        "correction": "vetor = (int *) malloc(5 * sizeof(int));"
    },

    // --- Intermediário 07-A ---
    {
        "title": "Código 07-A: Alocação para struct sem sizeof",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int id;\n    float nota;\n    char nome[50];\n} Aluno;\n\nint main(void) {\n\nAluno *aluno = (Aluno *) malloc(4);\n\naluno->id = 1;\naluno->nota = 9.5;\n\nprintf(\"ID: %d\\n\", aluno->id);\n\nfree(aluno);\nreturn 0;\n\n}",
        "error_description": "malloc(4) aloca apenas 4 bytes, enquanto a struct Aluno ocupa muito mais (int=4, float=4, char[50]=50 = pelo menos 58 bytes). Ao escrever nos campos da struct, o programa invade memória não alocada. Sempre use sizeof para alocar structs.",
        "correction": "Aluno *aluno = (Aluno *) malloc(sizeof(Aluno));"
    },

    // --- Intermediário 07-B ---
    {
        "title": "Código 07-B: calloc vs. malloc — conteúdo inicial",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\nint *notas = (int *) malloc(10 * sizeof(int));\n\n/* Imprime o vetor sem inicializar */\nfor (int i = 0; i < 10; i++) {\n    printf(\"%d \", notas[i]);\n}\n\nfree(notas);\nreturn 0;\n\n}",
        "error_description": "malloc não inicializa a memória alocada. O vetor conterá lixo de memória. Para garantir que todos os elementos comecem em zero, use calloc(10, sizeof(int)), que zera a memória automaticamente. Imprimir memória não inicializada é comportamento indefinido.",
        "correction": "int *notas = (int *) calloc(10, sizeof(int));"
    },

    // --- Original 08 ---
    {
        "title": "Código 08: Fuga de Memória (Memory Leak)",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nvoid criar_e_usar_vetor() {\n\nint *p = (int *) malloc(10 * sizeof(int));\n\np[0] = 100;\n\nprintf(\"O primeiro valor e: %d\\n\", p[0]);\n\n/* A função termina aqui */\n\n}\n\nint main(void) {\n\ncriar_e_usar_vetor();\n\nprintf(\"Fim do programa.\\n\");\n\nreturn 0;\n\n}",
        "error_description": "A memória é alocada dinamicamente dentro da função criar_e_usar_vetor, mas nunca é libertada com a função free(). Quando a função termina, o ponteiro p desaparece, mas a memória continua ocupada (perdida).",
        "correction": "free(p);"
    },

    // --- Intermediário 08-A ---
    {
        "title": "Código 08-A: Vazamento em laço de repetição",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\nint *buffer;\n\nfor (int i = 0; i < 5; i++) {\n    buffer = (int *) malloc(100 * sizeof(int));\n    buffer[0] = i;\n    printf(\"Iteracao %d: %d\\n\", i, buffer[0]);\n}\n\nfree(buffer);\nreturn 0;\n\n}",
        "error_description": "A cada iteração do loop, malloc aloca novo bloco e reatribui buffer — mas o bloco anterior nunca é liberado. Apenas o último bloco é liberado pelo free(buffer) no final. As 4 alocações anteriores vazam memória. O free deve estar DENTRO do loop.",
        "correction": "free(buffer); // Mover este free para dentro do loop, antes de buffer ser reatribuído"
    },

    // --- Intermediário 08-B ---
    {
        "title": "Código 08-B: Realloc descartando o ponteiro original",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\nint *vetor = (int *) malloc(5 * sizeof(int));\n\nfor (int i = 0; i < 5; i++) vetor[i] = i;\n\n/* Tenta expandir o vetor para 10 elementos */\nvetor = (int *) realloc(vetor, 10 * sizeof(int));\n\nfor (int i = 5; i < 10; i++) vetor[i] = i;\n\nfree(vetor);\nreturn 0;\n\n}",
        "error_description": "Se realloc falhar, ele retorna NULL mas NÃO libera o bloco original. Ao fazer vetor = realloc(vetor, ...) diretamente, você perde a referência ao bloco original (vazamento de memória) e em seguida tenta usar um ponteiro NULL. Sempre use um ponteiro temporário para capturar o retorno do realloc.",
        "correction": "int *temp = (int *) realloc(vetor, 10 * sizeof(int));\nif (temp == NULL) { free(vetor); return 1; }\nvetor = temp;"
    },

    // --- Original 09 ---
    {
        "title": "Código 09: Ponteiro Pendente (Dangling Pointer)",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\nint *ptr = (int *) malloc(sizeof(int));\n\n*ptr = 50;\n\nprintf(\"Valor original: %d\\n\", *ptr);\n\nfree(ptr); \n\n/* Mais código é executado... e de repente: */\n\n*ptr = 100; \n\nprintf(\"Novo valor: %d\\n\", *ptr);\n\nreturn 0;\n\n}",
        "error_description": "A memória para a qual ptr aponta foi libertada com free(ptr). No entanto, logo abaixo, o código tenta aceder a esse mesmo endereço desocupado (*ptr = 100;). Isso é um comportamento indefinido grave.",
        "correction": "ptr = NULL;"
    },

    // --- Intermediário 09-A ---
    {
        "title": "Código 09-A: Uso de ponteiro sem inicialização",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint *p;\n\n*p = 42;\n\nprintf(\"Valor: %d\\n\", *p);\n\nreturn 0;\n\n}",
        "error_description": "O ponteiro p foi declarado mas nunca inicializado — aponta para um endereço de memória aleatório (lixo). Desreferenciar (*p = 42) um ponteiro selvagem causa Segmentation Fault. Todo ponteiro deve ser inicializado antes do uso: com malloc, com o endereço de uma variável existente (&var), ou com NULL.",
        "correction": "int valor = 0;\nint *p = &valor;"
    },

    // --- Intermediário 09-B ---
    {
        "title": "Código 09-B: Double free",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\nint *dados = (int *) malloc(sizeof(int));\n*dados = 99;\n\nprintf(\"Dado: %d\\n\", *dados);\n\nfree(dados);\n\n/* ... mais código ... */\n\nfree(dados);\n\nreturn 0;\n\n}",
        "error_description": "Chamar free() duas vezes no mesmo ponteiro (double free) é um erro grave de gestão de memória. O resultado é comportamento indefinido, podendo corromper a heap ou causar falha de segmentação. Após liberar, defina o ponteiro como NULL para evitar liberações acidentais repetidas.",
        "correction": "free(dados);\ndados = NULL;"
    },

    // --- Original 10 ---
    {
        "title": "Código 10: Incompatibilidade de Alocação/Libertação (C++)",
        "code": "#include <iostream>\n\nint main() {\n\n// Aloca um array de 20 inteiros\nint *array = new int[20];\n\nfor(int i = 0; i < 20; i++){\n    array[i] = i;\n}\n\n// Liberta a memória alocada\ndelete array; \n\nreturn 0;\n\n}",
        "error_description": "Em C++, quando se aloca um array dinamicamente usando new[], é estritamente necessário libertá-lo usando delete[]. Usar apenas delete array; liberta apenas o primeiro elemento ou causa comportamento anómalo.",
        "correction": "delete[] array;"
    },

    // --- Intermediário 10-A ---
    {
        "title": "Código 10-A: new para objeto vs. new[] para array",
        "code": "#include <iostream>\n#include <string>\n\nclass Produto {\npublic:\n    std::string nome;\n    double preco;\n};\n\nint main() {\n\nProduto *estoque = new Produto;\nestoque[0].nome = \"Caneta\";\nestoque[1].nome = \"Caderno\";\n\ndelete[] estoque;\n\nreturn 0;\n\n}",
        "error_description": "Foi alocado apenas um objeto Produto com new Produto (sem colchetes), mas o código tenta acessar estoque[1] — que está fora da memória alocada. Para um array de Produtos, deve-se usar new Produto[N]. Note que o delete[] está correto para arrays.",
        "correction": "Produto *estoque = new Produto[2];"
    },

    // --- Intermediário 10-B ---
    {
        "title": "Código 10-B: Ponteiro para const vs. const ponteiro",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint x = 10;\nint y = 20;\n\nconst int *ptr = &x;\n\n/* Tenta modificar o valor apontado */\n*ptr = 30;\n\nprintf(\"x = %d\\n\", x);\n\nreturn 0;\n\n}",
        "error_description": "const int *ptr declara um ponteiro para int constante — o VALOR apontado não pode ser modificado através do ponteiro. Tentar fazer *ptr = 30 gera erro de compilação. Se a intenção é proteger o ponteiro em si (não o valor), use int * const ptr.",
        "correction": "int *ptr = &x;"
    },

    // --- Original 11 ---
    {
        "title": "Código 11: Falta de verificação de Segurança",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\n/* Tentativa de alocar uma quantidade gigantesca de memória */\nlong long int tamanho_gigante = 9999999999999999;\n\nint *ptr = (int *) malloc(tamanho_gigante * sizeof(int));\n\n/* Utilização imediata do ponteiro */\nptr[0] = 10; \n\nprintf(\"Valor: %d\\n\", ptr[0]);\n\nfree(ptr);\n\nreturn 0;\n\n}",
        "error_description": "O malloc pode falhar ao tentar alocar uma quantidade de memória não suportada, retornando NULL. Aceder a ptr[0] sem verificar se ptr é diferente de NULL causará um Segmentation Fault.",
        "correction": "if (ptr == NULL) { return 1; }"
    },

    // --- Intermediário 11-A ---
    {
        "title": "Código 11-A: Retorno de fopen sem verificação",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n\nFILE *arq = fopen(\"relatorio.txt\", \"r\");\n\nchar buf[256];\nfgets(buf, 256, arq);\n\nprintf(\"%s\", buf);\nfclose(arq);\n\nreturn 0;\n\n}",
        "error_description": "fopen retorna NULL se o arquivo não existir ou não puder ser aberto. Usar arq sem verificar se é NULL em fgets e fclose causa Segmentation Fault. Sempre valide o retorno de fopen antes de operar sobre o arquivo.",
        "correction": "if (arq == NULL) { perror(\"Erro ao abrir arquivo\"); return 1; }"
    },

    // --- Intermediário 11-B ---
    {
        "title": "Código 11-B: Verificação de retorno de scanf",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nint n;\nprintf(\"Digite um numero positivo: \");\nscanf(\"%d\", &n);\n\nint *vetor = (int *) __builtin_alloca(n * 4);\nvetor[0] = 100;\n\nprintf(\"Primeiro elemento: %d\\n\", vetor[0]);\n\nreturn 0;\n\n}",
        "error_description": "scanf retorna o número de itens lidos com sucesso. Se o usuário digitar texto em vez de um número, o retorno será 0 e n terá um valor imprevisível (lixo de memória), levando a uma alocação inválida. Sempre verifique o retorno de scanf: if (scanf(\"%d\", &n) != 1) { ... }",
        "correction": "if (scanf(\"%d\", &n) != 1 || n <= 0) { printf(\"Entrada invalida!\\n\"); return 1; }"
    },

    // --- Original 12 ---
    {
        "title": "Código 12: Tempo de Vida da Variável (Escopo Local)",
        "code": "#include <stdio.h>\n\nint* obter_numero_magico() {\n\nint numero = 42;\n\nreturn &numero; \n\n}\n\nint main(void) {\n\nint *p = obter_numero_magico();\n\nprintf(\"O numero magico e: %d\\n\", *p);\n\nreturn 0;\n\n}",
        "error_description": "A função devolve o endereço (&numero) de uma variável local. Quando a função obter_numero_magico termina, a variável numero é destruída. O ponteiro no main aponta agora para uma área de memória inválida.",
        "correction": "int *numero = (int *) malloc(sizeof(int));\n*numero = 42;\nreturn numero;"
    },

    // --- Intermediário 12-A ---
    {
        "title": "Código 12-A: Array local retornado por ponteiro",
        "code": "#include <stdio.h>\n\nint* gerar_sequencia() {\n    int seq[5] = {1, 2, 3, 4, 5};\n    return seq;\n}\n\nint main(void) {\n\nint *resultado = gerar_sequencia();\n\nfor (int i = 0; i < 5; i++) {\n    printf(\"%d \", resultado[i]);\n}\n\nreturn 0;\n\n}",
        "error_description": "Retornar um ponteiro para um array local é idêntico ao problema do ponteiro para variável local: quando gerar_sequencia() retorna, o array seq é destruído na stack. O ponteiro resultado aponta para memória inválida. A solução é alocar o array dinamicamente com malloc.",
        "correction": "int *seq = (int *) malloc(5 * sizeof(int));"
    },

    // --- Intermediário 12-B ---
    {
        "title": "Código 12-B: Variável estática vs. local",
        "code": "#include <stdio.h>\n\nint* contador_chamadas() {\n    int count = 0;\n    count++;\n    return &count;\n}\n\nint main(void) {\n\nint *c1 = contador_chamadas();\nint *c2 = contador_chamadas();\n\nprintf(\"Chamada 1: %d\\n\", *c1);\nprintf(\"Chamada 2: %d\\n\", *c2);\n\nreturn 0;\n\n}",
        "error_description": "A variável count é local e é recriada a cada chamada da função — retornar seu endereço é comportamento indefinido. Se a intenção é manter o estado entre chamadas, a variável deve ser declarada como static: ela persiste na memória durante toda a execução do programa.",
        "correction": "static int count = 0;"
    },

    // ═══════════════════════════════════════════
    //  MÓDULO 3: Manipulação de Ficheiros
    // ═══════════════════════════════════════════

    // --- Original 13 ---
    {
        "title": "Código 13: O ficheiro esquecido",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *ficheiro = fopen(\"dados_importantes.txt\", \"w\");\n\nif (ficheiro != NULL) {\n\nfprintf(ficheiro, \"A gravar informações cruciais no ficheiro...\\n\");\n\nprintf(\"Dados gravados com sucesso!\\n\");\n\n/* O programa faz outras coisas e termina */\n\n}\n\nreturn 0;\n\n}",
        "error_description": "O ficheiro foi aberto com fopen mas nunca foi fechado com fclose. Isto pode impedir que os dados sejam efetivamente gravados no disco, mantendo-os num buffer de memória.",
        "correction": "fclose(ficheiro);"
    },

    // --- Intermediário 13-A ---
    {
        "title": "Código 13-A: fflush antes de fechar",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *f = fopen(\"log.txt\", \"w\");\n\nif (f != NULL) {\n    fprintf(f, \"Registro 1\\n\");\n    fprintf(f, \"Registro 2\\n\");\n    \n    /* O programa trava aqui antes de fechar */\n    while(1); /* Simula travamento */\n    \n    fclose(f);\n}\n\nreturn 0;\n\n}",
        "error_description": "Se o programa travar ou encerrar abruptamente antes do fclose, os dados no buffer de escrita serão perdidos. Para garantir que dados críticos sejam gravados imediatamente no disco sem fechar o arquivo, use fflush(f) após as escritas importantes.",
        "correction": "fflush(f);"
    },

    // --- Intermediário 13-B ---
    {
        "title": "Código 13-B: Arquivo aberto em modo errado para leitura binária",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct { int id; float nota; } Registro;\n\nint main(void) {\n\nFILE *f = fopen(\"dados.bin\", \"r\");\n\nif (f != NULL) {\n    Registro r;\n    fread(&r, sizeof(Registro), 1, f);\n    printf(\"ID: %d, Nota: %.1f\\n\", r.id, r.nota);\n    fclose(f);\n}\n\nreturn 0;\n\n}",
        "error_description": "Para leitura de arquivos binários, o modo correto é \"rb\" (read binary). Em sistemas Windows, abrir em modo \"r\" (texto) faz com que sequências de bytes especiais (como 0x1A) sejam interpretadas como EOF, corrompendo a leitura de dados binários. Sempre use \"rb\" para leitura e \"wb\" para escrita binária.",
        "correction": "FILE *f = fopen(\"dados.bin\", \"rb\");"
    },

    // --- Original 14 ---
    {
        "title": "Código 14: Confiança cega",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *ficheiro = fopen(\"configuracoes_ocultas.txt\", \"r\");\n\nchar linha[100];\n\n/* Tentativa imediata de ler o ficheiro */\n\nfgets(linha, 100, ficheiro);\n\nprintf(\"A primeira linha lida foi: %s\\n\", linha);\n\nfclose(ficheiro);\n\nreturn 0;\n\n}",
        "error_description": "O código não verifica se ficheiro é NULL. Se o ficheiro \"configuracoes_ocultas.txt\" não existir no disco, o fopen devolve NULL e a chamada subsequente a fgets irá rebentar com o programa (Segmentation Fault).",
        "correction": "if (ficheiro != NULL) {"
    },

    // --- Intermediário 14-A ---
    {
        "title": "Código 14-A: Buffer overflow em leitura de string",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *f = fopen(\"nomes.txt\", \"r\");\n\nif (f != NULL) {\n    char nome[10];\n    fscanf(f, \"%s\", nome);\n    printf(\"Nome: %s\\n\", nome);\n    fclose(f);\n}\n\nreturn 0;\n\n}",
        "error_description": "fscanf com %s não limita o número de caracteres lidos. Se o arquivo contiver uma palavra com mais de 9 caracteres, o buffer nome[10] será estourado (buffer overflow), corrompendo a memória adjacente. Use %9s para limitar a leitura ao tamanho do buffer menos 1 (para o terminador \\0).",
        "correction": "fscanf(f, \"%9s\", nome);"
    },

    // --- Intermediário 14-B ---
    {
        "title": "Código 14-B: Leitura após erro de arquivo",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *f = fopen(\"dados.txt\", \"r\");\n\nif (f != NULL) {\n    int valor;\n    while (fscanf(f, \"%d\", &valor) == 1) {\n        printf(\"%d\\n\", valor);\n    }\n    \n    /* Tenta ler mais dados após o loop */\n    fscanf(f, \"%d\", &valor);\n    printf(\"Ultimo: %d\\n\", valor);\n    \n    fclose(f);\n}\n\nreturn 0;\n\n}",
        "error_description": "Após o loop terminar (seja por EOF ou por erro), tentar ler mais dados com fscanf retornará EOF ou 0. Mas a variável valor não será atualizada, e printf imprimirá o último valor bem-sucedido como se fosse um novo. Verifique sempre o retorno de fscanf antes de usar o valor lido.",
        "correction": "if (fscanf(f, \"%d\", &valor) == 1) { printf(\"Ultimo: %d\\n\", valor); }"
    },

    // --- Original 15 ---
    {
        "title": "Código 15: Conflito de Modos",
        "code": "#include <stdio.h>\n\nint main(void) {\n\n/* Abre o ficheiro para leitura (\"r\") */\nFILE *ficheiro = fopen(\"log_do_sistema.txt\", \"r\"); \n\nif (ficheiro != NULL) {\n\n/* Tenta escrever uma nova entrada no log */\nfprintf(ficheiro, \"NOVO REGISTO: O sistema iniciou corretamente.\\n\");\n\nfclose(ficheiro);\n\nprintf(\"Log atualizado.\\n\");\n\n} else {\n\nprintf(\"Erro ao abrir o ficheiro.\\n\");\n\n}\n\nreturn 0;\n\n}",
        "error_description": "O ficheiro foi aberto explicitamente em modo de leitura \"r\" (read). Contudo, o código tenta escrever nele com fprintf. A gravação vai falhar silenciosamente ou o programa terá um comportamento inesperado.",
        "correction": "FILE *ficheiro = fopen(\"log_do_sistema.txt\", \"a\");"
    },

    // --- Intermediário 15-A ---
    {
        "title": "Código 15-A: Modo de escrita apaga o arquivo",
        "code": "#include <stdio.h>\n\nint main(void) {\n\n/* Abre para adicionar novos registros ao histórico */\nFILE *historico = fopen(\"historico.txt\", \"w\");\n\nif (historico != NULL) {\n    fprintf(historico, \"Nova entrada\\n\");\n    fclose(historico);\n    printf(\"Historico atualizado!\\n\");\n}\n\nreturn 0;\n\n}",
        "error_description": "O modo \"w\" (write) cria o arquivo se não existir, mas se o arquivo JÁ EXISTIR, ele apaga todo o conteúdo anterior antes de escrever. Para adicionar dados ao final de um arquivo existente sem apagá-lo, use o modo \"a\" (append).",
        "correction": "FILE *historico = fopen(\"historico.txt\", \"a\");"
    },

    // --- Intermediário 15-B ---
    {
        "title": "Código 15-B: Leitura e escrita simultânea",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *f = fopen(\"config.txt\", \"r\");\n\nif (f != NULL) {\n    char linha[100];\n    fgets(linha, 100, f);\n    printf(\"Lido: %s\", linha);\n    \n    /* Agora tenta atualizar a config no mesmo arquivo */\n    fprintf(f, \"nova_config=ativo\\n\");\n    \n    fclose(f);\n}\n\nreturn 0;\n\n}",
        "error_description": "O arquivo foi aberto em modo \"r\" (somente leitura) mas depois tenta-se escrever com fprintf. Para ler e escrever no mesmo arquivo, deve-se usar o modo \"r+\" (leitura e escrita sem apagar) ou \"a+\" (append e leitura).",
        "correction": "FILE *f = fopen(\"config.txt\", \"r+\");"
    },

    // --- Original 16 ---
    {
        "title": "Código 16: O fantasma do EOF (End of File)",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *ficheiro = fopen(\"letras.txt\", \"r\");\n\nchar c;\n\nif (ficheiro != NULL) {\n\n/* Loop para ler até ao fim do ficheiro */\n\nwhile (!feof(ficheiro)) {\n\nc = fgetc(ficheiro);\n\nprintf(\"%c\", c);\n\n}\n\nfclose(ficheiro);\n\n}\n\nreturn 0;\n\n}",
        "error_description": "A função feof() só devolve verdadeiro depois de uma tentativa de leitura falhar. Isto faz com que o loop leia o último caractere, tente ler novamente, detete o final do ficheiro (EOF), e acabe por imprimir o último caractere duas vezes (ou lixo).",
        "correction": "while ((c = fgetc(ficheiro)) != EOF) { printf(\"%c\", c); }"
    },

    // --- Intermediário 16-A ---
    {
        "title": "Código 16-A: char para guardar EOF",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *f = fopen(\"texto.txt\", \"r\");\n\nif (f != NULL) {\n    char c;\n    while ((c = fgetc(f)) != EOF) {\n        printf(\"%c\", c);\n    }\n    fclose(f);\n}\n\nreturn 0;\n\n}",
        "error_description": "fgetc retorna int, não char. O valor de EOF é -1 (ou outro valor negativo). Em sistemas onde char é unsigned, nunca pode ser -1, tornando a comparação c != EOF sempre verdadeira (loop infinito). A variável que recebe o retorno de fgetc deve ser declarada como int.",
        "correction": "int c;"
    },

    // --- Intermediário 16-B ---
    {
        "title": "Código 16-B: ftell e fseek para navegação",
        "code": "#include <stdio.h>\n\nint main(void) {\n\nFILE *f = fopen(\"dados.txt\", \"r\");\n\nif (f != NULL) {\n    char linha[100];\n    \n    fgets(linha, 100, f);\n    printf(\"Linha 1: %s\", linha);\n    \n    /* Volta ao início para reler */\n    fseek(f, 0, SEEK_END);\n    \n    fgets(linha, 100, f);\n    printf(\"Linha 1 de novo: %s\", linha);\n    \n    fclose(f);\n}\n\nreturn 0;\n\n}",
        "error_description": "Para voltar ao início do arquivo e reler a partir do começo, o correto é fseek(f, 0, SEEK_SET) (posição 0 a partir do início) ou rewind(f). O código usa SEEK_END, que posiciona o cursor no FINAL do arquivo — a leitura subsequente não encontrará nada.",
        "correction": "fseek(f, 0, SEEK_SET);"
    },

    // --- Original 17 ---
    {
        "title": "Código 17: Gravando o endereço em vez do dado (Ficheiros Binários)",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct {\nint id;\nchar nome[50];\n} RegistoAluno;\n\nint main(void) {\n\nRegistoAluno *aluno = (RegistoAluno *) malloc(sizeof(RegistoAluno));\n\naluno->id = 101;\nstrcpy(aluno->nome, \"Maria Silva\");\n\nFILE *ficheiro = fopen(\"alunos.bin\", \"wb\");\n\nif (ficheiro != NULL) {\n\n/* Tenta gravar a estrutura no ficheiro binário */\nfwrite(&aluno, sizeof(RegistoAluno), 1, ficheiro);\n\nfclose(ficheiro);\n\nprintf(\"Registo gravado.\\n\");\n\n}\n\nfree(aluno);\n\nreturn 0;\n\n}",
        "error_description": "A variável aluno já é um ponteiro. Quando se faz fwrite(&aluno, ...), em vez de gravar os dados do aluno (id e nome), está-se a gravar o endereço de memória do ponteiro no ficheiro binário.",
        "correction": "fwrite(aluno, sizeof(RegistoAluno), 1, ficheiro);"
    },

    // --- Intermediário 17-A ---
    {
        "title": "Código 17-A: fread com contagem errada",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct { int id; float nota; } Aluno;\n\nint main(void) {\n\nFILE *f = fopen(\"alunos.bin\", \"rb\");\n\nif (f != NULL) {\n    Aluno turma[30];\n    \n    /* Tenta ler 30 registros de uma vez */\n    int lidos = fread(turma, 30, sizeof(Aluno), f);\n    \n    printf(\"Registros lidos: %d\\n\", lidos);\n    fclose(f);\n}\n\nreturn 0;\n\n}",
        "error_description": "Os argumentos de fread são: (buffer, tamanho_de_cada_elemento, número_de_elementos, arquivo). A ordem está invertida: está passando 30 como tamanho e sizeof(Aluno) como contagem. O correto é fread(turma, sizeof(Aluno), 30, f).",
        "correction": "int lidos = fread(turma, sizeof(Aluno), 30, f);"
    },

    // --- Intermediário 17-B ---
    {
        "title": "Código 17-B: Ponteiro dentro de struct em arquivo binário",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct {\n    int id;\n    char *nome;\n} Produto;\n\nint main(void) {\n\nProduto p;\np.id = 1;\np.nome = (char *) malloc(50);\nstrcpy(p.nome, \"Notebook\");\n\nFILE *f = fopen(\"produtos.bin\", \"wb\");\nif (f != NULL) {\n    fwrite(&p, sizeof(Produto), 1, f);\n    fclose(f);\n}\n\nfree(p.nome);\nreturn 0;\n\n}",
        "error_description": "A struct Produto contém um ponteiro char *nome. Ao gravar a struct em arquivo binário com fwrite, o que é salvo é o ENDEREÇO do ponteiro (um número de 4 ou 8 bytes), não a string em si. Ao reler o arquivo em outro processo, esse endereço será inválido. Structs com ponteiros não devem ser salvas diretamente; use um char nome[50] fixo ou serialização manual.",
        "correction": "typedef struct { int id; char nome[50]; } Produto;"
    },

    // ═══════════════════════════════════════════
    //  MÓDULO 4: Recursividade e Estruturas
    // ═══════════════════════════════════════════

    // --- Original 18 ---
    {
        "title": "Código 18: A Recursão Infinita",
        "code": "#include <stdio.h>\n\n/* Função para calcular o fatorial de um número */\n\nint fatorial(int n) {\n\n/* Tentativa de cálculo recursivo */\n\nreturn n * fatorial(n - 1);\n\n}\n\nint main(void) {\n\nint resultado = fatorial(5);\n\nprintf(\"O fatorial de 5 e: %d\\n\", resultado);\n\nreturn 0;\n\n}",
        "error_description": "Falta a condição de paragem (caso base). A função fatorial vai chamar-se a si mesma com valores cada vez menores (5, 4, 3, 2, 1, 0, -1...) até a memória Stack estoirar (Stack Overflow).",
        "correction": "if (n <= 1) return 1;"
    },

    // --- Intermediário 18-A ---
    {
        "title": "Código 18-A: Fibonacci sem memoização (exponencial)",
        "code": "#include <stdio.h>\n\nint fibonacci(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main(void) {\n    printf(\"Fibonacci(45) = %d\\n\", fibonacci(45));\n    return 0;\n}",
        "error_description": "A implementação está correta em lógica, mas tem complexidade O(2^n). Para fibonacci(45), a função é chamada bilhões de vezes, recalculando os mesmos subproblemas repetidamente. O programa levará muito tempo para terminar. A solução eficiente usa memoização (cache de resultados) ou programação dinâmica iterativa.",
        "correction": "int memo[100] = {0};\nmemo[0] = 0; memo[1] = 1;\n// Use memo[n] para cachear resultados já calculados"
    },

    // --- Intermediário 18-B ---
    {
        "title": "Código 18-B: Recursão com retorno esquecido",
        "code": "#include <stdio.h>\n\nint soma_recursiva(int n) {\n    if (n == 0) return 0;\n    soma_recursiva(n - 1) + n;\n}\n\nint main(void) {\n    printf(\"Soma de 1 a 5: %d\\n\", soma_recursiva(5));\n    return 0;\n}",
        "error_description": "Na linha 'soma_recursiva(n - 1) + n;', o resultado da expressão é calculado mas não é retornado. Faltou a palavra-chave return. Sem return, a função retorna um valor indefinido (lixo de registrador), e o resultado impresso será incorreto.",
        "correction": "return soma_recursiva(n - 1) + n;"
    },

    // --- Original 19 ---
    {
        "title": "Código 19: O Problema da Troca (Bubble Sort)",
        "code": "#include <stdio.h>\n\nvoid bubbleSort(int arr[], int n) {\n\nfor (int i = 0; i < n; i++) {\n\n/* O laço interno tenta empurrar o maior elemento para o fim */\n\nfor (int j = 0; j < n; j++) {\n\nif (arr[j] > arr[j + 1]) {\n\nint temp = arr[j];\n\narr[j] = arr[j + 1];\n\narr[j + 1] = temp;\n\n}\n\n}\n\n}\n\n}\n\nint main(void) {\n\nint valores[] = {5, 2, 9, 1, 5};\n\nbubbleSort(valores, 5);\n\nprintf(\"Primeiro valor: %d\\n\", valores[0]);\n\nreturn 0;\n\n}",
        "error_description": "O laço interior vai de 0 até n-1 (pois j < n). Ao fazer arr[j + 1], quando j for 4 (o último índice válido num array de tamanho 5), ele vai aceder a arr[5], invadindo memória fora dos limites do vetor.",
        "correction": "for (int j = 0; j < n - 1 - i; j++)"
    },

    // --- Intermediário 19-A ---
    {
        "title": "Código 19-A: Selection Sort com índice mínimo errado",
        "code": "#include <stdio.h>\n\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = 0;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        int temp = arr[min_idx];\n        arr[min_idx] = arr[i];\n        arr[i] = temp;\n    }\n}\n\nint main(void) {\n    int v[] = {64, 25, 12, 22, 11};\n    selectionSort(v, 5);\n    for (int i = 0; i < 5; i++) printf(\"%d \", v[i]);\n    return 0;\n}",
        "error_description": "O índice do menor elemento min_idx é inicializado como 0 (primeira posição do array inteiro) em vez de i (início da porção não ordenada). Isso faz com que comparações da porção já ordenada interfiram na busca pelo mínimo, produzindo resultados incorretos.",
        "correction": "int min_idx = i;"
    },

    // --- Intermediário 19-B ---
    {
        "title": "Código 19-B: Insertion Sort sem variável temporária",
        "code": "#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int j = i - 1;\n        while (j >= 0 && arr[j] > arr[i]) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = arr[i];\n    }\n}\n\nint main(void) {\n    int v[] = {12, 11, 13, 5, 6};\n    insertionSort(v, 5);\n    for (int i = 0; i < 5; i++) printf(\"%d \", v[i]);\n    return 0;\n}",
        "error_description": "Ao deslocar arr[j] para arr[j+1] no loop, o valor de arr[i] é sobrescrito quando j+1 == i. Depois, arr[j+1] = arr[i] insere um valor já corrompido. O valor original de arr[i] deve ser salvo em uma variável temporária ANTES do loop de deslocamento.",
        "correction": "int chave = arr[i];\n// usar chave no while e na atribuição final: arr[j+1] = chave;"
    },

    // --- Original 20 ---
    {
        "title": "Código 20: A Inserção Fantasma (Árvores Binárias)",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct No {\nint valor;\nstruct No *esq, *dir;\n} No;\n\n/* Função para inserir um valor numa Árvore Binária de Busca */\n\nvoid inserir(No *raiz, int valor) {\nif (raiz == NULL) {\nraiz = (No *) malloc(sizeof(No));\nraiz->valor = valor;\nraiz->esq = NULL;\nraiz->dir = NULL;\n} else if (valor < raiz->valor) {\ninserir(raiz->esq, valor);\n} else {\ninserir(raiz->dir, valor);\n}\n}\n\nint main(void) {\nNo *arvore = NULL;\ninserir(arvore, 10);\ninserir(arvore, 5);\nif (arvore != NULL) {\nprintf(\"A raiz da arvore e: %d\\n\", arvore->valor);\n} else {\nprintf(\"A arvore continua vazia!\\n\");\n}\nreturn 0;\n}",
        "error_description": "A passagem de raiz para a função inserir é feita por valor. A função aloca o nó numa cópia local do ponteiro raiz. Quando a função regressa, a variável arvore no main continua a valer NULL.",
        "correction": "No* inserir(No *raiz, int valor) {\nif (raiz == NULL) {\nraiz = (No *) malloc(sizeof(No));\nraiz->valor = valor;\nraiz->esq = NULL;\nraiz->dir = NULL;\n} else if (valor < raiz->valor) {\nraiz->esq = inserir(raiz->esq, valor);\n} else {\nraiz->dir = inserir(raiz->dir, valor);\n}\nreturn raiz;\n}"
    },

    // --- Intermediário 20-A ---
    {
        "title": "Código 20-A: Busca em árvore com ponteiro nulo não verificado",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct No { int valor; struct No *esq, *dir; } No;\n\nNo* buscar(No *raiz, int alvo) {\n    if (raiz->valor == alvo) return raiz;\n    if (alvo < raiz->valor) return buscar(raiz->esq, alvo);\n    return buscar(raiz->dir, alvo);\n}\n\nint main(void) {\n    No *arvore = NULL;\n    No *resultado = buscar(arvore, 42);\n    if (resultado) printf(\"Encontrado: %d\\n\", resultado->valor);\n    return 0;\n}",
        "error_description": "A função buscar não verifica se raiz é NULL antes de acessar raiz->valor. Quando a árvore está vazia (arvore = NULL) ou o elemento não é encontrado (chegamos a uma folha nula), a função desreferencia um ponteiro nulo, causando Segmentation Fault.",
        "correction": "if (raiz == NULL) return NULL;"
    },

    // --- Intermediário 20-B ---
    {
        "title": "Código 20-B: Lista encadeada com próximo apontando para si",
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct No { int valor; struct No *proximo; } No;\n\nNo* criar_no(int v) {\n    No *novo = (No *) malloc(sizeof(No));\n    novo->valor = v;\n    novo->proximo = novo; /* Aponta para si mesmo */\n    return novo;\n}\n\nint main(void) {\n    No *lista = criar_no(1);\n    No *n2 = criar_no(2);\n    lista->proximo = n2;\n    \n    No *atual = lista;\n    while (atual != NULL) {\n        printf(\"%d -> \", atual->valor);\n        atual = atual->proximo;\n    }\n    return 0;\n}",
        "error_description": "Ao criar um novo nó, novo->proximo = novo cria um ciclo imediato (o nó aponta para si mesmo). Mesmo ao corrigir lista->proximo = n2, o nó n2 ainda aponta para si mesmo, criando um loop infinito quando o percurso chega nele. O próximo de um novo nó deve ser inicializado como NULL.",
        "correction": "novo->proximo = NULL;"
    },

    // --- Original 21 ---
    {
        "title": "Código 21: Busca Binária Presa no Tempo",
        "code": "#include <stdio.h>\n\nint buscaBinaria(int vetor[], int tamanho, int alvo) {\n\nint inicio = 0;\n\nint fim = tamanho - 1;\n\nwhile (inicio <= fim) {\n\nint meio = (inicio + fim) / 2;\n\nif (vetor[meio] == alvo) {\n\nreturn meio; // Encontrou\n\n}\n\nif (vetor[meio] < alvo) {\n\ninicio = meio; // Ajusta o início\n\n} else {\n\nfim = meio; // Ajusta o fim\n\n}\n\n}\n\nreturn -1; // Não encontrou\n\n}",
        "error_description": "Se o elemento procurado não existir, o algoritmo pode entrar em loop infinito. Imagine que inicio e fim estão em posições adjacentes. Ao atualizar inicio = meio ou fim = meio, a diferença entre eles pode não diminuir devido ao arredondamento na divisão inteira.",
        "correction": "inicio = meio + 1;\nfim = meio - 1;"
    },

    // --- Intermediário 21-A ---
    {
        "title": "Código 21-A: Busca linear retornando índice errado",
        "code": "#include <stdio.h>\n\nint buscaLinear(int v[], int n, int alvo) {\n    for (int i = 0; i < n; i++) {\n        if (v[i] == alvo) {\n            return 1;\n        }\n    }\n    return -1;\n}\n\nint main(void) {\n    int numeros[] = {10, 25, 37, 42, 58};\n    int pos = buscaLinear(numeros, 5, 37);\n    printf(\"Encontrado na posicao: %d\\n\", pos);\n    return 0;\n}",
        "error_description": "A função retorna 1 (constante) quando encontra o elemento, em vez de retornar o índice i onde ele foi encontrado. O chamador recebe sempre 1, impossibilitando saber em qual posição do vetor o elemento está.",
        "correction": "return i;"
    },

    // --- Intermediário 21-B ---
    {
        "title": "Código 21-B: Overflow no cálculo do meio (busca binária)",
        "code": "#include <stdio.h>\n\nint buscaBinaria(int vetor[], int tamanho, int alvo) {\n    int inicio = 0;\n    int fim = tamanho - 1;\n    \n    while (inicio <= fim) {\n        int meio = (inicio + fim) / 2;\n        \n        if (vetor[meio] == alvo) return meio;\n        if (vetor[meio] < alvo) inicio = meio + 1;\n        else fim = meio - 1;\n    }\n    \n    return -1;\n}",
        "error_description": "Este código está quase correto, mas tem uma armadilha clássica: quando inicio e fim são números muito grandes, a soma (inicio + fim) pode causar overflow de inteiro em C, resultando em um valor negativo e comportamento incorreto. A forma segura de calcular o meio é: meio = inicio + (fim - inicio) / 2.",
        "correction": "int meio = inicio + (fim - inicio) / 2;"
    },

    // --- Original 22 ---
    {
        "title": "Código 22: O Caos na Tabela de Dispersão (Hash)",
        "code": "#include <stdio.h>\n\n#define MAX_HASH 100\n\nint tabela_hash[MAX_HASH];\n\n/* Função para gerar o índice e inserir na tabela de dispersão */\n\nvoid inserirHash(int chave_matricula, int valor) {\n\n/* Utiliza a chave diretamente como índice */\n\nint indice = chave_matricula; \n\ntabela_hash[indice] = valor;\n\nprintf(\"Valor inserido com sucesso!\\n\");\n\n}\n\nint main(void) {\n\n/* Matrícula de um aluno (ex: 202610543) */\n\ninserirHash(202610543, 10); \n\nreturn 0;\n\n}",
        "error_description": "A \"função hash\" está a usar o número de matrícula (ex: 202610543) diretamente como índice do vetor. No entanto, o nosso vetor tabela_hash só tem 100 posições (MAX_HASH). Tentar aceder ao índice 202610543 rebentará a memória do programa.",
        "correction": "int indice = chave_matricula % MAX_HASH;"
    },

    // --- Intermediário 22-A ---
    {
        "title": "Código 22-A: Colisão em tabela hash ignorada",
        "code": "#include <stdio.h>\n\n#define MAX 7\n\nint tabela[MAX];\nint ocupado[MAX];\n\nvoid inserir(int chave) {\n    int idx = chave % MAX;\n    tabela[idx] = chave;\n    ocupado[idx] = 1;\n    printf(\"Inserido %d na posicao %d\\n\", chave, idx);\n}\n\nint main(void) {\n    inserir(10);\n    inserir(17); /* Mesmo índice que 10: 17 % 7 = 3, 10 % 7 = 3 */\n    inserir(3);  /* Também índice 3 */\n    return 0;\n}",
        "error_description": "A função hash pode produzir o mesmo índice para chaves diferentes (colisão). O código simplesmente sobrescreve o valor anterior sem qualquer tratamento. Os valores 10, 17 e 3 todos mapeiam para o índice 3, e apenas o último inserido sobrevive. Tabelas hash reais precisam de tratamento de colisão (encadeamento ou sondagem linear).",
        "correction": "// Sondagem linear: int idx = chave % MAX;\n// while (ocupado[idx]) idx = (idx + 1) % MAX;"
    },

    // --- Intermediário 22-B ---
    {
        "title": "Código 22-B: Função hash com divisão por zero",
        "code": "#include <stdio.h>\n\n#define TAMANHO_HASH 0\n\nint tabela[10];\n\nint calcular_hash(int chave) {\n    return chave % TAMANHO_HASH;\n}\n\nint main(void) {\n    int idx = calcular_hash(42);\n    tabela[idx] = 42;\n    printf(\"Inserido no indice %d\\n\", idx);\n    return 0;\n}",
        "error_description": "TAMANHO_HASH está definido como 0. A operação chave % TAMANHO_HASH é uma divisão por zero, que causa Floating Point Exception (SIGFPE) em tempo de execução e termina o programa abruptamente. O tamanho da tabela hash deve ser sempre um número positivo, preferencialmente primo para reduzir colisões.",
        "correction": "#define TAMANHO_HASH 11"
    }
];