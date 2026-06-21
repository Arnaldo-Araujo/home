const exercisesData = [
    {
    "title": "Código 01: Entrada de dados",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int idade;\n    \n    printf(\"Digite sua idade: \");\n    \n    scanf(\"%d\", idade); \n    \n    printf(\"Voce tem %d anos.\n    \", idade);\n    \n    return 0;\n    \n    }",
    "error_description": "Na função scanf, faltou o operador de endereço & antes da variável idade. O scanf precisa saber o endereço de memória onde deve guardar o valor lido.",
    "correction": "scanf(\"%d\", &idade);"
},
    {
    "title": "Código 02: Leitura de ponto flutuante",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    float preco;\n    \n    printf(\"Digite o preco do produto: \");\n    \n    scanf(\"%f\", preco);\n    \n    printf(\"O preco informado foi: %.2f\n    \", preco);\n    \n    return 0;\n    \n    }",
    "error_description": "Assim como no scanf para inteiros, ao ler um float também é obrigatório passar o endereço da variável com o operador &. Sem ele, o comportamento é indefinido e o programa pode travar.",
    "correction": "scanf(\"%f\", &preco);"
},
    {
    "title": "Código 03: Especificador de formato errado",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    char letra;\n    \n    printf(\"Digite uma letra: \");\n    \n    scanf(\"%d\", &letra);\n    \n    printf(\"A letra digitada foi: %c\n    \", letra);\n    \n    return 0;\n    \n    }",
    "error_description": "O especificador %d é usado para inteiros. Para ler um único caractere com scanf, o especificador correto é %c. Usar %d vai interpretar o caractere como um número inteiro, gerando comportamento incorreto.",
    "correction": "scanf(\"%c\", &letra);"
},
    {
    "title": "Código 04: Comentários",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    /* Imprime uma mensagem de boas-vindas na tela\n    e finaliza o programa\n    \n    printf(\"Bem-vindo a C!\n    \");\n    \n    return 0;\n    \n    }",
    "error_description": "O bloco de comentário não foi fechado. Utilizou-se /* para iniciar o comentário de múltiplas linhas, mas esqueceu-se de o fechar com */. O compilador vai ignorar o resto do código.",
    "correction": "/* Imprime uma mensagem de boas-vindas na tela\n    e finaliza o programa */"
},
    {
    "title": "Código 05: Comentário de linha dentro de string",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    // Imprime o resultado\n    printf(\"O resultado e: // importante\n    \");\n    \n    return 0;\n    \n    }",
    "error_description": "Este código está sintaticamente correto! O // dentro de uma string literal não é tratado como comentário pelo compilador — é apenas texto. O erro conceitual seria achar que ele 'comenta' algo dentro de printf. Preste atenção: comentários de linha só funcionam fora de strings.",
    "correction": "printf(\"O resultado e: // importante\n    \");"
},
    {
    "title": "Código 06: Comentário aninhado",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    /* Calcula a media\n    /* dos alunos */\n    do semestre */\n    \n    float media = 7.5;\n    printf(\"Media: %.1f\n    \", media);\n    \n    return 0;\n    \n    }",
    "error_description": "Em C, comentários de bloco /* ... */ não podem ser aninhados. O primeiro */ encontrado fecha o comentário aberto pelo primeiro /*. Isso faz com que 'do semestre */' fique fora do comentário e cause erro de compilação.",
    "correction": "/* Calcula a media\n       dos alunos\n       do semestre */"
},
    {
    "title": "Código 07: Controle de Formato",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int numero = 42;\n    \n    printf(\"O valor da variavel e d\n    \", numero);\n    \n    return 0;\n    \n    }",
    "error_description": "O especificador de formato para um número inteiro é %d. No código, está apenas um d perdido no meio da string, o que fará com que imprima literalmente a letra \"d\".",
    "correction": "printf(\"O valor da variavel e %d\n    \", numero);"
},
    {
    "title": "Código 08: Formato para número grande",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    long long int populacao = 8100000000LL;\n    \n    printf(\"Populacao mundial: %d\n    \", populacao);\n    \n    return 0;\n    \n    }",
    "error_description": "O especificador %d é para inteiros do tipo int (geralmente 32 bits). Para long long int, que pode armazenar valores muito maiores, é obrigatório usar %lld. Usar %d causará truncamento e exibirá um valor incorreto.",
    "correction": "printf(\"Populacao mundial: %lld\n    \", populacao);"
},
    {
    "title": "Código 09: Impressão de string vs. char",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    char nome[] = \"Carlos\";\n    \n    printf(\"Nome: %c\n    \", nome);\n    \n    return 0;\n    \n    }",
    "error_description": "O especificador %c imprime um único caractere. Para imprimir uma cadeia de caracteres (string/array de char), o especificador correto é %s. Usar %c com um array imprimirá um caractere aleatório ou causará comportamento indefinido.",
    "correction": "printf(\"Nome: %s\n    \", nome);"
},
    {
    "title": "Código 10: Tomada de Decisão",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int a = 5;\n    \n    // Verifica se 'a' é igual a 10\n    \n    if (a = 10) {\n    \n    printf(\"A e igual a 10!\n    \");\n    \n    } else {\n    \n    printf(\"A e diferente de 10!\n    \");\n    \n    }\n    \n    return 0;\n    \n    }",
    "error_description": "Na instrução if (a = 10), está a ser feita uma atribuição (colocar o valor 10 em a) em vez de uma comparação. Como em C qualquer valor diferente de zero é verdadeiro, o bloco if será sempre executado.",
    "correction": "if (a == 10)"
},
    {
    "title": "Código 11: Comparação com zero",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int saldo = 0;\n    \n    if (saldo = 0) {\n    printf(\"Saldo zerado!\n    \");\n    } else {\n    printf(\"Saldo disponivel.\n    \");\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "Aqui o erro é duplamente traiçoeiro: if (saldo = 0) atribui 0 a saldo, e como 0 é falso em C, o bloco else sempre executa — o oposto do esperado. Nunca use = dentro de uma condição if quando quer comparar.",
    "correction": "if (saldo == 0)"
},
    {
    "title": "Código 12: Else pendurado (Dangling Else)",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int x = 10;\n    int y = 20;\n    \n    if (x > 5)\n        if (y > 15)\n            printf(\"y e maior que 15\n    \");\n    else\n        printf(\"x nao e maior que 5\n    \");\n    \n    return 0;\n    \n    }",
    "error_description": "Em C, o else sempre se associa ao if mais próximo. Aqui o else está recuado como se pertencesse ao if (x > 5), mas na prática pertence ao if (y > 15). O programa não se comporta como a indentação sugere. Use chaves {} para tornar a intenção explícita.",
    "correction": "if (x > 5) {\n        if (y > 15)\n            printf(\"y e maior que 15\n    \");\n    } else {\n        printf(\"x nao e maior que 5\n    \");\n    }"
},
    {
    "title": "Código 13: Conceitos de Memória e Inicialização",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int soma;\n    \n    int valor = 10;\n    \n    soma = soma + valor;\n    \n    printf(\"O resultado da soma e: %d\n    \", soma);\n    \n    return 0;\n    \n    }",
    "error_description": "A variável soma foi declarada mas nunca inicializada. Em C, isso significa que ela conterá \"lixo de memória\" (um valor aleatório). Ao fazer soma = soma + valor;, o resultado será imprevisível.",
    "correction": "int soma = 0;"
},
    {
    "title": "Código 14: Acumulador não zerado",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int i;\n    int contador;\n    \n    for (i = 0; i < 5; i++) {\n        contador++;\n    }\n    \n    printf(\"Contei %d vezes\n    \", contador);\n    \n    return 0;\n    \n    }",
    "error_description": "A variável contador não foi inicializada antes do loop. O operador ++ incrementa o valor atual, mas se o valor inicial é lixo de memória, o resultado final será imprevisível. Todo acumulador ou contador deve ser inicializado antes de ser usado.",
    "correction": "int contador = 0;"
},
    {
    "title": "Código 15: Flag booleana sem valor inicial",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int encontrado;\n    int vetor[] = {3, 7, 2, 9, 5};\n    int alvo = 9;\n    \n    for (int i = 0; i < 5; i++) {\n        if (vetor[i] == alvo) {\n            encontrado = 1;\n        }\n    }\n    \n    if (encontrado) {\n        printf(\"Elemento encontrado!\n    \");\n    } else {\n        printf(\"Elemento nao encontrado.\n    \");\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "A variável encontrado serve como flag booleana, mas não foi inicializada. Se o elemento não for encontrado, o loop termina sem atribuir valor algum, e o if (encontrado) lê lixo de memória — podendo imprimir 'Elemento encontrado!' erroneamente.",
    "correction": "int encontrado = 0;"
},
    {
    "title": "Código 16: Aspas Duplas",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    printf(Ola, Mundo da Programacao!\n    );\n    \n    return 0;\n    \n    }",
    "error_description": "Textos (strings literais) passados para a função printf precisam obrigatoriamente de estar entre aspas duplas \" \".",
    "correction": "printf(\"Ola, Mundo da Programacao!\n    \");"
},
    {
    "title": "Código 17: Aspas simples em lugar de duplas",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    char *linguagem = 'C Programming';\n    \n    printf(\"Linguagem: %s\n    \", linguagem);\n    \n    return 0;\n    \n    }",
    "error_description": "Em C, aspas simples ' ' delimitam um único caractere (char), não uma string. Para inicializar um ponteiro de char com uma string literal, é obrigatório usar aspas duplas \" \". 'C Programming' é inválido pois tem mais de um caractere.",
    "correction": "char *linguagem = \"C Programming\";"
},
    {
    "title": "Código 18: Caractere de escape incorreto",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    printf(\"Linha 1\n    Linha 2\\tTabulado\n    Caminho: C:\\users\n    ome\n    \");\n    \n    return 0;\n    \n    }",
    "error_description": "Dentro de strings em C, a barra invertida \\ inicia uma sequência de escape (\n     = nova linha, \\t = tabulação). Em 'C:\\users\n    ome', o \\u e \n     serão interpretados como sequências de escape inválidas ou incorretas. Para representar uma barra invertida literal, é necessário escapá-la como \\\\.",
    "correction": "printf(\"Caminho: C:\\\\users\\\n    ome\n    \");"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: Omissão de tamanho correto",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    int main(void) {\n    \n    int *vetor;\n    \n    /* Tenta alocar memória para um vetor de 5 números inteiros */\n    \n    vetor = (int *) malloc(5); \n    \n    for(int i = 0; i < 5; i++) {\n    \n    vetor[i] = i * 10;\n    \n    printf(\"%d \", vetor[i]);\n    \n    }\n    \n    free(vetor);\n    \n    return 0;\n    \n    }",
    "error_description": "malloc(5) aloca apenas 5 bytes de memória. Um inteiro (int) normalmente ocupa 4 bytes. Ao tentar aceder a vetor[1] em diante, o programa estará a invadir memória não alocada (buffer overflow), causando corrupção ou Segmentation Fault.",
    "correction": "vetor = (int *) malloc(5 * sizeof(int));"
},
    {
    "title": "Código 02: Alocação para struct sem sizeof",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    typedef struct {\n        int id;\n        float nota;\n        char nome[50];\n    } Aluno;\n    \n    int main(void) {\n    \n    Aluno *aluno = (Aluno *) malloc(4);\n    \n    aluno->id = 1;\n    aluno->nota = 9.5;\n    \n    printf(\"ID: %d\n    \", aluno->id);\n    \n    free(aluno);\n    return 0;\n    \n    }",
    "error_description": "malloc(4) aloca apenas 4 bytes, enquanto a struct Aluno ocupa muito mais (int=4, float=4, char[50]=50 = pelo menos 58 bytes). Ao escrever nos campos da struct, o programa invade memória não alocada. Sempre use sizeof para alocar structs.",
    "correction": "Aluno *aluno = (Aluno *) malloc(sizeof(Aluno));"
},
    {
    "title": "Código 03: calloc vs. malloc — conteúdo inicial",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    int main(void) {\n    \n    int *notas = (int *) malloc(10 * sizeof(int));\n    \n    /* Imprime o vetor sem inicializar */\n    for (int i = 0; i < 10; i++) {\n        printf(\"%d \", notas[i]);\n    }\n    \n    free(notas);\n    return 0;\n    \n    }",
    "error_description": "malloc não inicializa a memória alocada. O vetor conterá lixo de memória. Para garantir que todos os elementos comecem em zero, use calloc(10, sizeof(int)), que zera a memória automaticamente. Imprimir memória não inicializada é comportamento indefinido.",
    "correction": "int *notas = (int *) calloc(10, sizeof(int));"
},
    {
    "title": "Código 04: Fuga de Memória (Memory Leak)",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    void criar_e_usar_vetor() {\n    \n    int *p = (int *) malloc(10 * sizeof(int));\n    \n    p[0] = 100;\n    \n    printf(\"O primeiro valor e: %d\n    \", p[0]);\n    \n    /* A função termina aqui */\n    \n    }\n    \n    int main(void) {\n    \n    criar_e_usar_vetor();\n    \n    printf(\"Fim do programa.\n    \");\n    \n    return 0;\n    \n    }",
    "error_description": "A memória é alocada dinamicamente dentro da função criar_e_usar_vetor, mas nunca é libertada com a função free(). Quando a função termina, o ponteiro p desaparece, mas a memória continua ocupada (perdida).",
    "correction": "free(p);"
},
    {
    "title": "Código 05: Vazamento em laço de repetição",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    int main(void) {\n    \n    int *buffer;\n    \n    for (int i = 0; i < 5; i++) {\n        buffer = (int *) malloc(100 * sizeof(int));\n        buffer[0] = i;\n        printf(\"Iteracao %d: %d\n    \", i, buffer[0]);\n    }\n    \n    free(buffer);\n    return 0;\n    \n    }",
    "error_description": "A cada iteração do loop, malloc aloca novo bloco e reatribui buffer — mas o bloco anterior nunca é liberado. Apenas o último bloco é liberado pelo free(buffer) no final. As 4 alocações anteriores vazam memória. O free deve estar DENTRO do loop.",
    "correction": "free(buffer); // Mover este free para dentro do loop, antes de buffer ser reatribuído"
},
    {
    "title": "Código 06: Realloc descartando o ponteiro original",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    int main(void) {\n    \n    int *vetor = (int *) malloc(5 * sizeof(int));\n    \n    for (int i = 0; i < 5; i++) vetor[i] = i;\n    \n    /* Tenta expandir o vetor para 10 elementos */\n    vetor = (int *) realloc(vetor, 10 * sizeof(int));\n    \n    for (int i = 5; i < 10; i++) vetor[i] = i;\n    \n    free(vetor);\n    return 0;\n    \n    }",
    "error_description": "Se realloc falhar, ele retorna NULL mas NÃO libera o bloco original. Ao fazer vetor = realloc(vetor, ...) diretamente, você perde a referência ao bloco original (vazamento de memória) e em seguida tenta usar um ponteiro NULL. Sempre use um ponteiro temporário para capturar o retorno do realloc.",
    "correction": "int *temp = (int *) realloc(vetor, 10 * sizeof(int));\n    if (temp == NULL) { free(vetor); return 1; }\n    vetor = temp;"
},
    {
    "title": "Código 07: Ponteiro Pendente (Dangling Pointer)",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    int main(void) {\n    \n    int *ptr = (int *) malloc(sizeof(int));\n    \n    *ptr = 50;\n    \n    printf(\"Valor original: %d\n    \", *ptr);\n    \n    free(ptr); \n    \n    /* Mais código é executado... e de repente: */\n    \n    *ptr = 100; \n    \n    printf(\"Novo valor: %d\n    \", *ptr);\n    \n    return 0;\n    \n    }",
    "error_description": "A memória para a qual ptr aponta foi libertada com free(ptr). No entanto, logo abaixo, o código tenta aceder a esse mesmo endereço desocupado (*ptr = 100;). Isso é um comportamento indefinido grave.",
    "correction": "ptr = NULL;"
},
    {
    "title": "Código 08: Uso de ponteiro sem inicialização",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int *p;\n    \n    *p = 42;\n    \n    printf(\"Valor: %d\n    \", *p);\n    \n    return 0;\n    \n    }",
    "error_description": "O ponteiro p foi declarado mas nunca inicializado — aponta para um endereço de memória aleatório (lixo). Desreferenciar (*p = 42) um ponteiro selvagem causa Segmentation Fault. Todo ponteiro deve ser inicializado antes do uso: com malloc, com o endereço de uma variável existente (&var), ou com NULL.",
    "correction": "int valor = 0;\n    int *p = &valor;"
},
    {
    "title": "Código 09: Double free",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    int main(void) {\n    \n    int *dados = (int *) malloc(sizeof(int));\n    *dados = 99;\n    \n    printf(\"Dado: %d\n    \", *dados);\n    \n    free(dados);\n    \n    /* ... mais código ... */\n    \n    free(dados);\n    \n    return 0;\n    \n    }",
    "error_description": "Chamar free() duas vezes no mesmo ponteiro (double free) é um erro grave de gestão de memória. O resultado é comportamento indefinido, podendo corromper a heap ou causar falha de segmentação. Após liberar, defina o ponteiro como NULL para evitar liberações acidentais repetidas.",
    "correction": "free(dados);\n    dados = NULL;"
},
    {
    "title": "Código 10: Incompatibilidade de Alocação/Libertação (C++)",
    "code": "#include <iostream>\n    \n    int main() {\n    \n    // Aloca um array de 20 inteiros\n    int *array = new int[20];\n    \n    for(int i = 0; i < 20; i++){\n        array[i] = i;\n    }\n    \n    // Liberta a memória alocada\n    delete array; \n    \n    return 0;\n    \n    }",
    "error_description": "Em C++, quando se aloca um array dinamicamente usando new[], é estritamente necessário libertá-lo usando delete[]. Usar apenas delete array; liberta apenas o primeiro elemento ou causa comportamento anómalo.",
    "correction": "delete[] array;"
},
    {
    "title": "Código 11: new para objeto vs. new[] para array",
    "code": "#include <iostream>\n    #include <string>\n    \n    class Produto {\n    public:\n        std::string nome;\n        double preco;\n    };\n    \n    int main() {\n    \n    Produto *estoque = new Produto;\n    estoque[0].nome = \"Caneta\";\n    estoque[1].nome = \"Caderno\";\n    \n    delete[] estoque;\n    \n    return 0;\n    \n    }",
    "error_description": "Foi alocado apenas um objeto Produto com new Produto (sem colchetes), mas o código tenta acessar estoque[1] — que está fora da memória alocada. Para um array de Produtos, deve-se usar new Produto[N]. Note que o delete[] está correto para arrays.",
    "correction": "Produto *estoque = new Produto[2];"
},
    {
    "title": "Código 12: Ponteiro para const vs. const ponteiro",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int x = 10;\n    int y = 20;\n    \n    const int *ptr = &x;\n    \n    /* Tenta modificar o valor apontado */\n    *ptr = 30;\n    \n    printf(\"x = %d\n    \", x);\n    \n    return 0;\n    \n    }",
    "error_description": "const int *ptr declara um ponteiro para int constante — o VALOR apontado não pode ser modificado através do ponteiro. Tentar fazer *ptr = 30 gera erro de compilação. Se a intenção é proteger o ponteiro em si (não o valor), use int * const ptr.",
    "correction": "int *ptr = &x;"
},
    {
    "title": "Código 13: Falta de verificação de Segurança",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    int main(void) {\n    \n    /* Tentativa de alocar uma quantidade gigantesca de memória */\n    long long int tamanho_gigante = 9999999999999999;\n    \n    int *ptr = (int *) malloc(tamanho_gigante * sizeof(int));\n    \n    /* Utilização imediata do ponteiro */\n    ptr[0] = 10; \n    \n    printf(\"Valor: %d\n    \", ptr[0]);\n    \n    free(ptr);\n    \n    return 0;\n    \n    }",
    "error_description": "O malloc pode falhar ao tentar alocar uma quantidade de memória não suportada, retornando NULL. Aceder a ptr[0] sem verificar se ptr é diferente de NULL causará um Segmentation Fault.",
    "correction": "if (ptr == NULL) { return 1; }"
},
    {
    "title": "Código 14: Retorno de fopen sem verificação",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    int main(void) {\n    \n    FILE *arq = fopen(\"relatorio.txt\", \"r\");\n    \n    char buf[256];\n    fgets(buf, 256, arq);\n    \n    printf(\"%s\", buf);\n    fclose(arq);\n    \n    return 0;\n    \n    }",
    "error_description": "fopen retorna NULL se o arquivo não existir ou não puder ser aberto. Usar arq sem verificar se é NULL em fgets e fclose causa Segmentation Fault. Sempre valide o retorno de fopen antes de operar sobre o arquivo.",
    "correction": "if (arq == NULL) { perror(\"Erro ao abrir arquivo\"); return 1; }"
},
    {
    "title": "Código 15: Verificação de retorno de scanf",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    int n;\n    printf(\"Digite um numero positivo: \");\n    scanf(\"%d\", &n);\n    \n    int *vetor = (int *) __builtin_alloca(n * 4);\n    vetor[0] = 100;\n    \n    printf(\"Primeiro elemento: %d\n    \", vetor[0]);\n    \n    return 0;\n    \n    }",
    "error_description": "scanf retorna o número de itens lidos com sucesso. Se o usuário digitar texto em vez de um número, o retorno será 0 e n terá um valor imprevisível (lixo de memória), levando a uma alocação inválida. Sempre verifique o retorno de scanf: if (scanf(\"%d\", &n) != 1) { ... }",
    "correction": "if (scanf(\"%d\", &n) != 1 || n <= 0) { printf(\"Entrada invalida!\n    \"); return 1; }"
},
    {
    "title": "Código 16: Tempo de Vida da Variável (Escopo Local)",
    "code": "#include <stdio.h>\n    \n    int* obter_numero_magico() {\n    \n    int numero = 42;\n    \n    return &numero; \n    \n    }\n    \n    int main(void) {\n    \n    int *p = obter_numero_magico();\n    \n    printf(\"O numero magico e: %d\n    \", *p);\n    \n    return 0;\n    \n    }",
    "error_description": "A função devolve o endereço (&numero) de uma variável local. Quando a função obter_numero_magico termina, a variável numero é destruída. O ponteiro no main aponta agora para uma área de memória inválida.",
    "correction": "int *numero = (int *) malloc(sizeof(int));\n    *numero = 42;\n    return numero;"
},
    {
    "title": "Código 17: Array local retornado por ponteiro",
    "code": "#include <stdio.h>\n    \n    int* gerar_sequencia() {\n        int seq[5] = {1, 2, 3, 4, 5};\n        return seq;\n    }\n    \n    int main(void) {\n    \n    int *resultado = gerar_sequencia();\n    \n    for (int i = 0; i < 5; i++) {\n        printf(\"%d \", resultado[i]);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "Retornar um ponteiro para um array local é idêntico ao problema do ponteiro para variável local: quando gerar_sequencia() retorna, o array seq é destruído na stack. O ponteiro resultado aponta para memória inválida. A solução é alocar o array dinamicamente com malloc.",
    "correction": "int *seq = (int *) malloc(5 * sizeof(int));"
},
    {
    "title": "Código 18: Variável estática vs. local",
    "code": "#include <stdio.h>\n    \n    int* contador_chamadas() {\n        int count = 0;\n        count++;\n        return &count;\n    }\n    \n    int main(void) {\n    \n    int *c1 = contador_chamadas();\n    int *c2 = contador_chamadas();\n    \n    printf(\"Chamada 1: %d\n    \", *c1);\n    printf(\"Chamada 2: %d\n    \", *c2);\n    \n    return 0;\n    \n    }",
    "error_description": "A variável count é local e é recriada a cada chamada da função — retornar seu endereço é comportamento indefinido. Se a intenção é manter o estado entre chamadas, a variável deve ser declarada como static: ela persiste na memória durante toda a execução do programa.",
    "correction": "static int count = 0;"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: O ficheiro esquecido",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *ficheiro = fopen(\"dados_importantes.txt\", \"w\");\n    \n    if (ficheiro != NULL) {\n    \n    fprintf(ficheiro, \"A gravar informações cruciais no ficheiro...\n    \");\n    \n    printf(\"Dados gravados com sucesso!\n    \");\n    \n    /* O programa faz outras coisas e termina */\n    \n    }\n    \n    return 0;\n    \n    }",
    "error_description": "O ficheiro foi aberto com fopen mas nunca foi fechado com fclose. Isto pode impedir que os dados sejam efetivamente gravados no disco, mantendo-os num buffer de memória.",
    "correction": "fclose(ficheiro);"
},
    {
    "title": "Código 02: fflush antes de fechar",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *f = fopen(\"log.txt\", \"w\");\n    \n    if (f != NULL) {\n        fprintf(f, \"Registro 1\n    \");\n        fprintf(f, \"Registro 2\n    \");\n        \n        /* O programa trava aqui antes de fechar */\n        while(1); /* Simula travamento */\n        \n        fclose(f);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "Se o programa travar ou encerrar abruptamente antes do fclose, os dados no buffer de escrita serão perdidos. Para garantir que dados críticos sejam gravados imediatamente no disco sem fechar o arquivo, use fflush(f) após as escritas importantes.",
    "correction": "fflush(f);"
},
    {
    "title": "Código 03: Arquivo aberto em modo errado para leitura binária",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    typedef struct { int id; float nota; } Registro;\n    \n    int main(void) {\n    \n    FILE *f = fopen(\"dados.bin\", \"r\");\n    \n    if (f != NULL) {\n        Registro r;\n        fread(&r, sizeof(Registro), 1, f);\n        printf(\"ID: %d, Nota: %.1f\n    \", r.id, r.nota);\n        fclose(f);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "Para leitura de arquivos binários, o modo correto é \"rb\" (read binary). Em sistemas Windows, abrir em modo \"r\" (texto) faz com que sequências de bytes especiais (como 0x1A) sejam interpretadas como EOF, corrompendo a leitura de dados binários. Sempre use \"rb\" para leitura e \"wb\" para escrita binária.",
    "correction": "FILE *f = fopen(\"dados.bin\", \"rb\");"
},
    {
    "title": "Código 04: Confiança cega",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *ficheiro = fopen(\"configuracoes_ocultas.txt\", \"r\");\n    \n    char linha[100];\n    \n    /* Tentativa imediata de ler o ficheiro */\n    \n    fgets(linha, 100, ficheiro);\n    \n    printf(\"A primeira linha lida foi: %s\n    \", linha);\n    \n    fclose(ficheiro);\n    \n    return 0;\n    \n    }",
    "error_description": "O código não verifica se ficheiro é NULL. Se o ficheiro \"configuracoes_ocultas.txt\" não existir no disco, o fopen devolve NULL e a chamada subsequente a fgets irá rebentar com o programa (Segmentation Fault).",
    "correction": "if (ficheiro != NULL) {"
},
    {
    "title": "Código 05: Buffer overflow em leitura de string",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *f = fopen(\"nomes.txt\", \"r\");\n    \n    if (f != NULL) {\n        char nome[10];\n        fscanf(f, \"%s\", nome);\n        printf(\"Nome: %s\n    \", nome);\n        fclose(f);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "fscanf com %s não limita o número de caracteres lidos. Se o arquivo contiver uma palavra com mais de 9 caracteres, o buffer nome[10] será estourado (buffer overflow), corrompendo a memória adjacente. Use %9s para limitar a leitura ao tamanho do buffer menos 1 (para o terminador \\0).",
    "correction": "fscanf(f, \"%9s\", nome);"
},
    {
    "title": "Código 06: Leitura após erro de arquivo",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *f = fopen(\"dados.txt\", \"r\");\n    \n    if (f != NULL) {\n        int valor;\n        while (fscanf(f, \"%d\", &valor) == 1) {\n            printf(\"%d\n    \", valor);\n        }\n        \n        /* Tenta ler mais dados após o loop */\n        fscanf(f, \"%d\", &valor);\n        printf(\"Ultimo: %d\n    \", valor);\n        \n        fclose(f);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "Após o loop terminar (seja por EOF ou por erro), tentar ler mais dados com fscanf retornará EOF ou 0. Mas a variável valor não será atualizada, e printf imprimirá o último valor bem-sucedido como se fosse um novo. Verifique sempre o retorno de fscanf antes de usar o valor lido.",
    "correction": "if (fscanf(f, \"%d\", &valor) == 1) { printf(\"Ultimo: %d\n    \", valor); }"
},
    {
    "title": "Código 07: Conflito de Modos",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    /* Abre o ficheiro para leitura (\"r\") */\n    FILE *ficheiro = fopen(\"log_do_sistema.txt\", \"r\"); \n    \n    if (ficheiro != NULL) {\n    \n    /* Tenta escrever uma nova entrada no log */\n    fprintf(ficheiro, \"NOVO REGISTO: O sistema iniciou corretamente.\n    \");\n    \n    fclose(ficheiro);\n    \n    printf(\"Log atualizado.\n    \");\n    \n    } else {\n    \n    printf(\"Erro ao abrir o ficheiro.\n    \");\n    \n    }\n    \n    return 0;\n    \n    }",
    "error_description": "O ficheiro foi aberto explicitamente em modo de leitura \"r\" (read). Contudo, o código tenta escrever nele com fprintf. A gravação vai falhar silenciosamente ou o programa terá um comportamento inesperado.",
    "correction": "FILE *ficheiro = fopen(\"log_do_sistema.txt\", \"a\");"
},
    {
    "title": "Código 08: Modo de escrita apaga o arquivo",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    /* Abre para adicionar novos registros ao histórico */\n    FILE *historico = fopen(\"historico.txt\", \"w\");\n    \n    if (historico != NULL) {\n        fprintf(historico, \"Nova entrada\n    \");\n        fclose(historico);\n        printf(\"Historico atualizado!\n    \");\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "O modo \"w\" (write) cria o arquivo se não existir, mas se o arquivo JÁ EXISTIR, ele apaga todo o conteúdo anterior antes de escrever. Para adicionar dados ao final de um arquivo existente sem apagá-lo, use o modo \"a\" (append).",
    "correction": "FILE *historico = fopen(\"historico.txt\", \"a\");"
},
    {
    "title": "Código 09: Leitura e escrita simultânea",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *f = fopen(\"config.txt\", \"r\");\n    \n    if (f != NULL) {\n        char linha[100];\n        fgets(linha, 100, f);\n        printf(\"Lido: %s\", linha);\n        \n        /* Agora tenta atualizar a config no mesmo arquivo */\n        fprintf(f, \"nova_config=ativo\n    \");\n        \n        fclose(f);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "O arquivo foi aberto em modo \"r\" (somente leitura) mas depois tenta-se escrever com fprintf. Para ler e escrever no mesmo arquivo, deve-se usar o modo \"r+\" (leitura e escrita sem apagar) ou \"a+\" (append e leitura).",
    "correction": "FILE *f = fopen(\"config.txt\", \"r+\");"
},
    {
    "title": "Código 10: O fantasma do EOF (End of File)",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *ficheiro = fopen(\"letras.txt\", \"r\");\n    \n    char c;\n    \n    if (ficheiro != NULL) {\n    \n    /* Loop para ler até ao fim do ficheiro */\n    \n    while (!feof(ficheiro)) {\n    \n    c = fgetc(ficheiro);\n    \n    printf(\"%c\", c);\n    \n    }\n    \n    fclose(ficheiro);\n    \n    }\n    \n    return 0;\n    \n    }",
    "error_description": "A função feof() só devolve verdadeiro depois de uma tentativa de leitura falhar. Isto faz com que o loop leia o último caractere, tente ler novamente, detete o final do ficheiro (EOF), e acabe por imprimir o último caractere duas vezes (ou lixo).",
    "correction": "while ((c = fgetc(ficheiro)) != EOF) { printf(\"%c\", c); }"
},
    {
    "title": "Código 11: char para guardar EOF",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *f = fopen(\"texto.txt\", \"r\");\n    \n    if (f != NULL) {\n        char c;\n        while ((c = fgetc(f)) != EOF) {\n            printf(\"%c\", c);\n        }\n        fclose(f);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "fgetc retorna int, não char. O valor de EOF é -1 (ou outro valor negativo). Em sistemas onde char é unsigned, nunca pode ser -1, tornando a comparação c != EOF sempre verdadeira (loop infinito). A variável que recebe o retorno de fgetc deve ser declarada como int.",
    "correction": "int c;"
},
    {
    "title": "Código 12: ftell e fseek para navegação",
    "code": "#include <stdio.h>\n    \n    int main(void) {\n    \n    FILE *f = fopen(\"dados.txt\", \"r\");\n    \n    if (f != NULL) {\n        char linha[100];\n        \n        fgets(linha, 100, f);\n        printf(\"Linha 1: %s\", linha);\n        \n        /* Volta ao início para reler */\n        fseek(f, 0, SEEK_END);\n        \n        fgets(linha, 100, f);\n        printf(\"Linha 1 de novo: %s\", linha);\n        \n        fclose(f);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "Para voltar ao início do arquivo e reler a partir do começo, o correto é fseek(f, 0, SEEK_SET) (posição 0 a partir do início) ou rewind(f). O código usa SEEK_END, que posiciona o cursor no FINAL do arquivo — a leitura subsequente não encontrará nada.",
    "correction": "fseek(f, 0, SEEK_SET);"
},
    {
    "title": "Código 13: Gravando o endereço em vez do dado (Ficheiros Binários)",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    #include <string.h>\n    \n    typedef struct {\n    int id;\n    char nome[50];\n    } RegistoAluno;\n    \n    int main(void) {\n    \n    RegistoAluno *aluno = (RegistoAluno *) malloc(sizeof(RegistoAluno));\n    \n    aluno->id = 101;\n    strcpy(aluno->nome, \"Maria Silva\");\n    \n    FILE *ficheiro = fopen(\"alunos.bin\", \"wb\");\n    \n    if (ficheiro != NULL) {\n    \n    /* Tenta gravar a estrutura no ficheiro binário */\n    fwrite(&aluno, sizeof(RegistoAluno), 1, ficheiro);\n    \n    fclose(ficheiro);\n    \n    printf(\"Registo gravado.\n    \");\n    \n    }\n    \n    free(aluno);\n    \n    return 0;\n    \n    }",
    "error_description": "A variável aluno já é um ponteiro. Quando se faz fwrite(&aluno, ...), em vez de gravar os dados do aluno (id e nome), está-se a gravar o endereço de memória do ponteiro no ficheiro binário.",
    "correction": "fwrite(aluno, sizeof(RegistoAluno), 1, ficheiro);"
},
    {
    "title": "Código 14: fread com contagem errada",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    typedef struct { int id; float nota; } Aluno;\n    \n    int main(void) {\n    \n    FILE *f = fopen(\"alunos.bin\", \"rb\");\n    \n    if (f != NULL) {\n        Aluno turma[30];\n        \n        /* Tenta ler 30 registros de uma vez */\n        int lidos = fread(turma, 30, sizeof(Aluno), f);\n        \n        printf(\"Registros lidos: %d\n    \", lidos);\n        fclose(f);\n    }\n    \n    return 0;\n    \n    }",
    "error_description": "Os argumentos de fread são: (buffer, tamanho_de_cada_elemento, número_de_elementos, arquivo). A ordem está invertida: está passando 30 como tamanho e sizeof(Aluno) como contagem. O correto é fread(turma, sizeof(Aluno), 30, f).",
    "correction": "int lidos = fread(turma, sizeof(Aluno), 30, f);"
},
    {
    "title": "Código 15: Ponteiro dentro de struct em arquivo binário",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    #include <string.h>\n    \n    typedef struct {\n        int id;\n        char *nome;\n    } Produto;\n    \n    int main(void) {\n    \n    Produto p;\n    p.id = 1;\n    p.nome = (char *) malloc(50);\n    strcpy(p.nome, \"Notebook\");\n    \n    FILE *f = fopen(\"produtos.bin\", \"wb\");\n    if (f != NULL) {\n        fwrite(&p, sizeof(Produto), 1, f);\n        fclose(f);\n    }\n    \n    free(p.nome);\n    return 0;\n    \n    }",
    "error_description": "A struct Produto contém um ponteiro char *nome. Ao gravar a struct em arquivo binário com fwrite, o que é salvo é o ENDEREÇO do ponteiro (um número de 4 ou 8 bytes), não a string em si. Ao reler o arquivo em outro processo, esse endereço será inválido. Structs com ponteiros não devem ser salvas diretamente; use um char nome[50] fixo ou serialização manual.",
    "correction": "typedef struct { int id; char nome[50]; } Produto;"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: A Recursão Infinita",
    "code": "#include <stdio.h>\n    \n    /* Função para calcular o fatorial de um número */\n    \n    int fatorial(int n) {\n    \n    /* Tentativa de cálculo recursivo */\n    \n    return n * fatorial(n - 1);\n    \n    }\n    \n    int main(void) {\n    \n    int resultado = fatorial(5);\n    \n    printf(\"O fatorial de 5 e: %d\n    \", resultado);\n    \n    return 0;\n    \n    }",
    "error_description": "Falta a condição de paragem (caso base). A função fatorial vai chamar-se a si mesma com valores cada vez menores (5, 4, 3, 2, 1, 0, -1...) até a memória Stack estoirar (Stack Overflow).",
    "correction": "if (n <= 1) return 1;"
},
    {
    "title": "Código 02: Fibonacci sem memoização (exponencial)",
    "code": "#include <stdio.h>\n    \n    int fibonacci(int n) {\n        if (n == 0) return 0;\n        if (n == 1) return 1;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n    \n    int main(void) {\n        printf(\"Fibonacci(45) = %d\n    \", fibonacci(45));\n        return 0;\n    }",
    "error_description": "A implementação está correta em lógica, mas tem complexidade O(2^n). Para fibonacci(45), a função é chamada bilhões de vezes, recalculando os mesmos subproblemas repetidamente. O programa levará muito tempo para terminar. A solução eficiente usa memoização (cache de resultados) ou programação dinâmica iterativa.",
    "correction": "int memo[100] = {0};\n    memo[0] = 0; memo[1] = 1;\n    // Use memo[n] para cachear resultados já calculados"
},
    {
    "title": "Código 03: Recursão com retorno esquecido",
    "code": "#include <stdio.h>\n    \n    int soma_recursiva(int n) {\n        if (n == 0) return 0;\n        soma_recursiva(n - 1) + n;\n    }\n    \n    int main(void) {\n        printf(\"Soma de 1 a 5: %d\n    \", soma_recursiva(5));\n        return 0;\n    }",
    "error_description": "Na linha 'soma_recursiva(n - 1) + n;', o resultado da expressão é calculado mas não é retornado. Faltou a palavra-chave return. Sem return, a função retorna um valor indefinido (lixo de registrador), e o resultado impresso será incorreto.",
    "correction": "return soma_recursiva(n - 1) + n;"
},
    {
    "title": "Código 04: O Problema da Troca (Bubble Sort)",
    "code": "#include <stdio.h>\n    \n    void bubbleSort(int arr[], int n) {\n    \n    for (int i = 0; i < n; i++) {\n    \n    /* O laço interno tenta empurrar o maior elemento para o fim */\n    \n    for (int j = 0; j < n; j++) {\n    \n    if (arr[j] > arr[j + 1]) {\n    \n    int temp = arr[j];\n    \n    arr[j] = arr[j + 1];\n    \n    arr[j + 1] = temp;\n    \n    }\n    \n    }\n    \n    }\n    \n    }\n    \n    int main(void) {\n    \n    int valores[] = {5, 2, 9, 1, 5};\n    \n    bubbleSort(valores, 5);\n    \n    printf(\"Primeiro valor: %d\n    \", valores[0]);\n    \n    return 0;\n    \n    }",
    "error_description": "O laço interior vai de 0 até n-1 (pois j < n). Ao fazer arr[j + 1], quando j for 4 (o último índice válido num array de tamanho 5), ele vai aceder a arr[5], invadindo memória fora dos limites do vetor.",
    "correction": "for (int j = 0; j < n - 1 - i; j++)"
},
    {
    "title": "Código 05: Selection Sort com índice mínimo errado",
    "code": "#include <stdio.h>\n    \n    void selectionSort(int arr[], int n) {\n        for (int i = 0; i < n - 1; i++) {\n            int min_idx = 0;\n            for (int j = i + 1; j < n; j++) {\n                if (arr[j] < arr[min_idx]) {\n                    min_idx = j;\n                }\n            }\n            int temp = arr[min_idx];\n            arr[min_idx] = arr[i];\n            arr[i] = temp;\n        }\n    }\n    \n    int main(void) {\n        int v[] = {64, 25, 12, 22, 11};\n        selectionSort(v, 5);\n        for (int i = 0; i < 5; i++) printf(\"%d \", v[i]);\n        return 0;\n    }",
    "error_description": "O índice do menor elemento min_idx é inicializado como 0 (primeira posição do array inteiro) em vez de i (início da porção não ordenada). Isso faz com que comparações da porção já ordenada interfiram na busca pelo mínimo, produzindo resultados incorretos.",
    "correction": "int min_idx = i;"
},
    {
    "title": "Código 06: Insertion Sort sem variável temporária",
    "code": "#include <stdio.h>\n    \n    void insertionSort(int arr[], int n) {\n        for (int i = 1; i < n; i++) {\n            int j = i - 1;\n            while (j >= 0 && arr[j] > arr[i]) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = arr[i];\n        }\n    }\n    \n    int main(void) {\n        int v[] = {12, 11, 13, 5, 6};\n        insertionSort(v, 5);\n        for (int i = 0; i < 5; i++) printf(\"%d \", v[i]);\n        return 0;\n    }",
    "error_description": "Ao deslocar arr[j] para arr[j+1] no loop, o valor de arr[i] é sobrescrito quando j+1 == i. Depois, arr[j+1] = arr[i] insere um valor já corrompido. O valor original de arr[i] deve ser salvo em uma variável temporária ANTES do loop de deslocamento.",
    "correction": "int chave = arr[i];\n    // usar chave no while e na atribuição final: arr[j+1] = chave;"
},
    {
    "title": "Código 07: A Inserção Fantasma (Árvores Binárias)",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    typedef struct No {\n    int valor;\n    struct No *esq, *dir;\n    } No;\n    \n    /* Função para inserir um valor numa Árvore Binária de Busca */\n    \n    void inserir(No *raiz, int valor) {\n    if (raiz == NULL) {\n    raiz = (No *) malloc(sizeof(No));\n    raiz->valor = valor;\n    raiz->esq = NULL;\n    raiz->dir = NULL;\n    } else if (valor < raiz->valor) {\n    inserir(raiz->esq, valor);\n    } else {\n    inserir(raiz->dir, valor);\n    }\n    }\n    \n    int main(void) {\n    No *arvore = NULL;\n    inserir(arvore, 10);\n    inserir(arvore, 5);\n    if (arvore != NULL) {\n    printf(\"A raiz da arvore e: %d\n    \", arvore->valor);\n    } else {\n    printf(\"A arvore continua vazia!\n    \");\n    }\n    return 0;\n    }",
    "error_description": "A passagem de raiz para a função inserir é feita por valor. A função aloca o nó numa cópia local do ponteiro raiz. Quando a função regressa, a variável arvore no main continua a valer NULL.",
    "correction": "No* inserir(No *raiz, int valor) {\n    if (raiz == NULL) {\n    raiz = (No *) malloc(sizeof(No));\n    raiz->valor = valor;\n    raiz->esq = NULL;\n    raiz->dir = NULL;\n    } else if (valor < raiz->valor) {\n    raiz->esq = inserir(raiz->esq, valor);\n    } else {\n    raiz->dir = inserir(raiz->dir, valor);\n    }\n    return raiz;\n    }"
},
    {
    "title": "Código 08: Busca em árvore com ponteiro nulo não verificado",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    typedef struct No { int valor; struct No *esq, *dir; } No;\n    \n    No* buscar(No *raiz, int alvo) {\n        if (raiz->valor == alvo) return raiz;\n        if (alvo < raiz->valor) return buscar(raiz->esq, alvo);\n        return buscar(raiz->dir, alvo);\n    }\n    \n    int main(void) {\n        No *arvore = NULL;\n        No *resultado = buscar(arvore, 42);\n        if (resultado) printf(\"Encontrado: %d\n    \", resultado->valor);\n        return 0;\n    }",
    "error_description": "A função buscar não verifica se raiz é NULL antes de acessar raiz->valor. Quando a árvore está vazia (arvore = NULL) ou o elemento não é encontrado (chegamos a uma folha nula), a função desreferencia um ponteiro nulo, causando Segmentation Fault.",
    "correction": "if (raiz == NULL) return NULL;"
},
    {
    "title": "Código 09: Lista encadeada com próximo apontando para si",
    "code": "#include <stdio.h>\n    #include <stdlib.h>\n    \n    typedef struct No { int valor; struct No *proximo; } No;\n    \n    No* criar_no(int v) {\n        No *novo = (No *) malloc(sizeof(No));\n        novo->valor = v;\n        novo->proximo = novo; /* Aponta para si mesmo */\n        return novo;\n    }\n    \n    int main(void) {\n        No *lista = criar_no(1);\n        No *n2 = criar_no(2);\n        lista->proximo = n2;\n        \n        No *atual = lista;\n        while (atual != NULL) {\n            printf(\"%d -> \", atual->valor);\n            atual = atual->proximo;\n        }\n        return 0;\n    }",
    "error_description": "Ao criar um novo nó, novo->proximo = novo cria um ciclo imediato (o nó aponta para si mesmo). Mesmo ao corrigir lista->proximo = n2, o nó n2 ainda aponta para si mesmo, criando um loop infinito quando o percurso chega nele. O próximo de um novo nó deve ser inicializado como NULL.",
    "correction": "novo->proximo = NULL;"
},
    {
    "title": "Código 10: Busca Binária Presa no Tempo",
    "code": "#include <stdio.h>\n    \n    int buscaBinaria(int vetor[], int tamanho, int alvo) {\n    \n    int inicio = 0;\n    \n    int fim = tamanho - 1;\n    \n    while (inicio <= fim) {\n    \n    int meio = (inicio + fim) / 2;\n    \n    if (vetor[meio] == alvo) {\n    \n    return meio; // Encontrou\n    \n    }\n    \n    if (vetor[meio] < alvo) {\n    \n    inicio = meio; // Ajusta o início\n    \n    } else {\n    \n    fim = meio; // Ajusta o fim\n    \n    }\n    \n    }\n    \n    return -1; // Não encontrou\n    \n    }",
    "error_description": "Se o elemento procurado não existir, o algoritmo pode entrar em loop infinito. Imagine que inicio e fim estão em posições adjacentes. Ao atualizar inicio = meio ou fim = meio, a diferença entre eles pode não diminuir devido ao arredondamento na divisão inteira.",
    "correction": "inicio = meio + 1;\n    fim = meio - 1;"
},
    {
    "title": "Código 11: Busca linear retornando índice errado",
    "code": "#include <stdio.h>\n    \n    int buscaLinear(int v[], int n, int alvo) {\n        for (int i = 0; i < n; i++) {\n            if (v[i] == alvo) {\n                return 1;\n            }\n        }\n        return -1;\n    }\n    \n    int main(void) {\n        int numeros[] = {10, 25, 37, 42, 58};\n        int pos = buscaLinear(numeros, 5, 37);\n        printf(\"Encontrado na posicao: %d\n    \", pos);\n        return 0;\n    }",
    "error_description": "A função retorna 1 (constante) quando encontra o elemento, em vez de retornar o índice i onde ele foi encontrado. O chamador recebe sempre 1, impossibilitando saber em qual posição do vetor o elemento está.",
    "correction": "return i;"
},
    {
    "title": "Código 12: Overflow no cálculo do meio (busca binária)",
    "code": "#include <stdio.h>\n    \n    int buscaBinaria(int vetor[], int tamanho, int alvo) {\n        int inicio = 0;\n        int fim = tamanho - 1;\n        \n        while (inicio <= fim) {\n            int meio = (inicio + fim) / 2;\n            \n            if (vetor[meio] == alvo) return meio;\n            if (vetor[meio] < alvo) inicio = meio + 1;\n            else fim = meio - 1;\n        }\n        \n        return -1;\n    }",
    "error_description": "Este código está quase correto, mas tem uma armadilha clássica: quando inicio e fim são números muito grandes, a soma (inicio + fim) pode causar overflow de inteiro em C, resultando em um valor negativo e comportamento incorreto. A forma segura de calcular o meio é: meio = inicio + (fim - inicio) / 2.",
    "correction": "int meio = inicio + (fim - inicio) / 2;"
},
    {
    "title": "Código 13: O Caos na Tabela de Dispersão (Hash)",
    "code": "#include <stdio.h>\n    \n    #define MAX_HASH 100\n    \n    int tabela_hash[MAX_HASH];\n    \n    /* Função para gerar o índice e inserir na tabela de dispersão */\n    \n    void inserirHash(int chave_matricula, int valor) {\n    \n    /* Utiliza a chave diretamente como índice */\n    \n    int indice = chave_matricula; \n    \n    tabela_hash[indice] = valor;\n    \n    printf(\"Valor inserido com sucesso!\n    \");\n    \n    }\n    \n    int main(void) {\n    \n    /* Matrícula de um aluno (ex: 202610543) */\n    \n    inserirHash(202610543, 10); \n    \n    return 0;\n    \n    }",
    "error_description": "A \"função hash\" está a usar o número de matrícula (ex: 202610543) diretamente como índice do vetor. No entanto, o nosso vetor tabela_hash só tem 100 posições (MAX_HASH). Tentar aceder ao índice 202610543 rebentará a memória do programa.",
    "correction": "int indice = chave_matricula % MAX_HASH;"
},
    {
    "title": "Código 14: Colisão em tabela hash ignorada",
    "code": "#include <stdio.h>\n    \n    #define MAX 7\n    \n    int tabela[MAX];\n    int ocupado[MAX];\n    \n    void inserir(int chave) {\n        int idx = chave % MAX;\n        tabela[idx] = chave;\n        ocupado[idx] = 1;\n        printf(\"Inserido %d na posicao %d\n    \", chave, idx);\n    }\n    \n    int main(void) {\n        inserir(10);\n        inserir(17); /* Mesmo índice que 10: 17 % 7 = 3, 10 % 7 = 3 */\n        inserir(3);  /* Também índice 3 */\n        return 0;\n    }",
    "error_description": "A função hash pode produzir o mesmo índice para chaves diferentes (colisão). O código simplesmente sobrescreve o valor anterior sem qualquer tratamento. Os valores 10, 17 e 3 todos mapeiam para o índice 3, e apenas o último inserido sobrevive. Tabelas hash reais precisam de tratamento de colisão (encadeamento ou sondagem linear).",
    "correction": "// Sondagem linear: int idx = chave % MAX;\n    // while (ocupado[idx]) idx = (idx + 1) % MAX;"
},
    {
    "title": "Código 15: Função hash com divisão por zero",
    "code": "#include <stdio.h>\n    \n    #define TAMANHO_HASH 0\n    \n    int tabela[10];\n    \n    int calcular_hash(int chave) {\n        return chave % TAMANHO_HASH;\n    }\n    \n    int main(void) {\n        int idx = calcular_hash(42);\n        tabela[idx] = 42;\n        printf(\"Inserido no indice %d\n    \", idx);\n        return 0;\n    }",
    "error_description": "TAMANHO_HASH está definido como 0. A operação chave % TAMANHO_HASH é uma divisão por zero, que causa Floating Point Exception (SIGFPE) em tempo de execução e termina o programa abruptamente. O tamanho da tabela hash deve ser sempre um número positivo, preferencialmente primo para reduzir colisões.",
    "correction": "#define TAMANHO_HASH 11"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: Pilha sem Fundo (Stack Underflow)",
    "error_description": "A função de pop tenta retirar de uma pilha vazia e acessa um índice negativo.",
    "code": "// Implementação de uma Pilha em C\n        #include <stdio.h>\n        #define MAX 5\n        \n        int stack[MAX];\n        int top = 0; // Erro lógico: top indica o próximo espaço vazio\n        \n        void push(int val) {\n            if (top < MAX) {\n                stack[top++] = val;\n            }\n        }\n        \n        int pop() {\n            // Retira o elemento do topo da pilha\n            return stack[--top];\n        }\n        \n        int main() {\n            push(10);\n            pop();\n            // Esta chamada causará underflow e acessará stack[-1]\n            int val = pop();\n            printf(\"Valor retirado: %d\n        \", val);\n            return 0;\n        }",
    "correction": "// Antes de decrementar e acessar, deve-se verificar se a pilha não está vazia.\n        int pop() {\n            if (top > 0) {\n                return stack[--top];\n            }\n            return -1; // Sinaliza erro\n        }"
},
    {
    "title": "Código 02: Fila Circular Sobreposta",
    "error_description": "Fila circular perde o controle de tamanho e sobrepõe os dados sem verificar o limite.",
    "code": "// Fila Circular (Circular Queue)\n        #include <stdio.h>\n        #define SIZE 3\n        \n        int queue[SIZE];\n        int head = 0, tail = 0;\n        \n        void enqueue(int val) {\n            queue[tail] = val;\n            tail = (tail + 1) % SIZE;\n            // Faltou verificar se head == tail (Fila cheia)\n        }\n        \n        int main() {\n            enqueue(1);\n            enqueue(2);\n            enqueue(3);\n            enqueue(4); // Vai sobrescrever o elemento '1' silenciosamente\n            printf(\"Head aponta para: %d\n        \", queue[head]);\n            return 0;\n        }",
    "correction": "// Adicionar uma variável \"count\" ou verificar (tail + 1) % SIZE == head\n        int count = 0;\n        void enqueue(int val) {\n            if (count < SIZE) {\n                queue[tail] = val;\n                tail = (tail + 1) % SIZE;\n                count++;\n            }\n        }"
},
    {
    "title": "Código 03: Lista Encadeada Perdida",
    "error_description": "Avanço do ponteiro head diretamente causa memory leak de todos os nós removidos.",
    "code": "#include <stdio.h>\n        #include <stdlib.h>\n        \n        typedef struct Node {\n            int data;\n            struct Node* next;\n        } Node;\n        \n        Node* head = NULL;\n        \n        void remove_first() {\n            if (head != NULL) {\n                // Erro: avança o head mas não dá free() no nó antigo!\n                head = head->next;\n            }\n        }\n        \n        int main() {\n            head = malloc(sizeof(Node));\n            head->data = 10;\n            head->next = NULL;\n            remove_first();\n            return 0;\n        }",
    "correction": "// Deve-se guardar o ponteiro original antes de avançar o head\n        void remove_first() {\n            if (head != NULL) {\n                Node* temp = head;\n                head = head->next;\n                free(temp);\n            }\n        }"
},
    {
    "title": "Código 04: Lista Duplamente Encadeada (Nó Isolado)",
    "error_description": "Erro ao remover nó do meio: o ponteiro 'prev' do próximo nó não foi atualizado.",
    "code": "#include <stdio.h>\n        #include <stdlib.h>\n        \n        typedef struct Node {\n            int data;\n            struct Node* next;\n            struct Node* prev;\n        } Node;\n        \n        void remove_node(Node* target) {\n            if (!target) return;\n            \n            if (target->prev) {\n                target->prev->next = target->next;\n            }\n            // Erro: não atualiza o ponteiro prev do target->next\n            \n            free(target);\n        }",
    "correction": "// Atualizar o ponteiro prev do próximo nó\n        void remove_node(Node* target) {\n            if (!target) return;\n            if (target->prev) target->prev->next = target->next;\n            if (target->next) target->next->prev = target->prev;\n            free(target);\n        }"
},
    {
    "title": "Código 05: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 06: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 07: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 08: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 09: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 10: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 11: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 12: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 13: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 14: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 15: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: QuickSort Recursão Infinita",
    "error_description": "O particionamento do QuickSort usa índices de forma que causa loop infinito se existirem elementos duplicados repetidos.",
    "code": "#include <stdio.h>\n        \n        void quicksort(int arr[], int left, int right) {\n            if (left >= right) return;\n            \n            int pivot = arr[left];\n            int i = left, j = right;\n            \n            while (i <= j) {\n                while (arr[i] < pivot) i++;\n                while (arr[j] > pivot) j--;\n                if (i <= j) {\n                    int temp = arr[i];\n                    arr[i] = arr[j];\n                    arr[j] = temp;\n                    // Erro: faltou incrementar i e decrementar j aqui!\n                    // Causa loop infinito se arr[i] == pivot e arr[j] == pivot.\n                }\n            }\n            \n            quicksort(arr, left, j);\n            quicksort(arr, i, right);\n        }",
    "correction": "// Deve incrementar i e decrementar j logo após a troca\n                if (i <= j) {\n                    int temp = arr[i];\n                    arr[i] = arr[j];\n                    arr[j] = temp;\n                    i++;\n                    j--;\n                }"
},
    {
    "title": "Código 02: Merge Sort Vazamento de Memória",
    "error_description": "Merge Sort aloca array temporário dinamicamente em cada recursão, mas esquece de liberar.",
    "code": "#include <stdlib.h>\n        \n        void merge(int arr[], int l, int m, int r) {\n            int n1 = m - l + 1;\n            int n2 = r - m;\n            \n            // Aloca arrays temporários\n            int *L = malloc(n1 * sizeof(int));\n            int *R = malloc(n2 * sizeof(int));\n            \n            for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n            for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n            \n            int i = 0, j = 0, k = l;\n            while (i < n1 && j < n2) {\n                if (L[i] <= R[j]) arr[k++] = L[i++];\n                else arr[k++] = R[j++];\n            }\n            while (i < n1) arr[k++] = L[i++];\n            while (j < n2) arr[k++] = R[j++];\n            \n            // Erro: Memory leak. Os arrays L e R não recebem free() no final.\n        }",
    "correction": "// Adicionar free no final da função\n            free(L);\n            free(R);\n        }"
},
    {
    "title": "Código 03: Heap Sort (Fora dos Limites)",
    "error_description": "Cálculo do filho esquerdo em árvore representada por array causa Out of Bounds.",
    "code": "#include <stdio.h>\n        \n        void heapify(int arr[], int n, int i) {\n            int largest = i;\n            int left = 2 * i;      // Erro: em arrays 0-indexados, o filho esquerdo é 2*i + 1\n            int right = 2 * i + 1; // Erro: e o direito é 2*i + 2\n            \n            if (left < n && arr[left] > arr[largest])\n                largest = left;\n                \n            if (right < n && arr[right] > arr[largest])\n                largest = right;\n                \n            if (largest != i) {\n                int swap = arr[i];\n                arr[i] = arr[largest];\n                arr[largest] = swap;\n                heapify(arr, n, largest);\n            }\n        }",
    "correction": "// Aritmética de índices 0-based\n            int left = 2 * i + 1;\n            int right = 2 * i + 2;"
},
    {
    "title": "Código 04: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 05: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 06: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 07: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 08: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 09: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 10: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 11: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 12: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 13: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 14: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 15: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: Ponteiro Duplo Mal Alocado",
    "error_description": "Tentativa de alocar uma matriz dinâmica resulta em Segmentation Fault pois o array de ponteiros não foi inicializado corretamente.",
    "code": "#include <stdlib.h>\n        \n        int** create_matrix(int rows, int cols) {\n            // Erro: alocando sizeof(int) em vez de sizeof(int*)\n            int** matrix = malloc(rows * sizeof(int));\n            \n            for(int i = 0; i < rows; i++) {\n                matrix[i] = malloc(cols * sizeof(int));\n            }\n            return matrix;\n        }",
    "correction": "// O array primário deve ser um array de ponteiros para int\n            int** matrix = malloc(rows * sizeof(int*));"
},
    {
    "title": "Código 02: Ponteiro de Função Incompatível",
    "error_description": "Uso de casting forçado para ponteiro de função destrói o comportamento na chamada.",
    "code": "#include <stdio.h>\n        \n        int add(int a, int b) {\n            return a + b;\n        }\n        \n        int main() {\n            // Erro de casting: A assinatura de ponteiro de função está errada\n            void (*func_ptr)() = (void (*)()) add;\n            \n            // Comportamento indefinido!\n            int result = ((int (*)(int, int))func_ptr)(5, 10);\n            printf(\"%d\n        \", result);\n            return 0;\n        }",
    "correction": "// Deve-se declarar o ponteiro de função com a assinatura correta\n            int (*func_ptr)(int, int) = add;\n            int result = func_ptr(5, 10);"
},
    {
    "title": "Código 03: Aritmética Cega",
    "error_description": "Aritmética de ponteiros subtraindo ponteiros de tipos incompatíveis ou operando sobre void* (ilegal em C padrão).",
    "code": "#include <stdio.h>\n        \n        int main() {\n            int arr[5] = {10, 20, 30, 40, 50};\n            void* ptr1 = &arr[0];\n            void* ptr2 = &arr[3];\n            \n            // GCC permite aritmética com void* como extensão, mas o padrão C proíbe.\n            // O erro real: o avanço numérico em void* é tratado como bytes (1),\n            // logo a distância não será 3, mas 3 * sizeof(int).\n            int diff = ptr2 - ptr1;\n            printf(\"Diferença de índices: %d\n        \", diff);\n            return 0;\n        }",
    "correction": "// Converter para int* antes da aritmética\n            int diff = (int*)ptr2 - (int*)ptr1;"
},
    {
    "title": "Código 04: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 05: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 06: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 07: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 08: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 09: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 10: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 11: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 12: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 13: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 14: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 15: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: AVL - Rotação Incompleta",
    "error_description": "Rotação à direita em uma árvore AVL perde o filho esquerdo do novo nó raiz.",
    "code": "typedef struct Node {\n            int key;\n            struct Node *left;\n            struct Node *right;\n            int height;\n        } Node;\n        \n        Node *rightRotate(Node *y) {\n            Node *x = y->left;\n            Node *T2 = x->right;\n        \n            // Rotação\n            x->right = y;\n            // Erro: y->left deve receber T2 para não perder a sub-árvore\n            // y->left = NULL; \n            \n            return x;\n        }",
    "correction": "// Transferir a sub-árvore direita de x para a esquerda de y\n            y->left = T2;"
},
    {
    "title": "Código 02: Remoção com 2 Filhos (BST)",
    "error_description": "Ao remover um nó com 2 filhos, o nó substituto não é corretamente removido de sua posição original.",
    "code": "#include <stdlib.h>\n        typedef struct Node { int key; struct Node *left, *right; } Node;\n        \n        Node* minValueNode(Node* node) {\n            Node* current = node;\n            while (current && current->left != NULL) current = current->left;\n            return current;\n        }\n        \n        Node* deleteNode(Node* root, int key) {\n            if (root == NULL) return root;\n            if (key < root->key) root->left = deleteNode(root->left, key);\n            else if (key > root->key) root->right = deleteNode(root->right, key);\n            else {\n                if (root->left == NULL) return root->right;\n                else if (root->right == NULL) return root->left;\n                \n                Node* temp = minValueNode(root->right);\n                root->key = temp->key;\n                // Erro: O temp ainda existe na sub-árvore direita! \n                // Ele precisa ser deletado da raiz original.\n            }\n            return root;\n        }",
    "correction": "// Deletar o sucessor inorder da sub-árvore direita\n                root->right = deleteNode(root->right, temp->key);"
},
    {
    "title": "Código 03: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 04: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 05: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 06: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 07: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 08: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 09: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 10: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 11: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 12: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 13: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 14: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 15: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: BFS em Loop Infinito",
    "error_description": "Busca em largura em grafo com ciclos (cíclico) não marca nós como visitados, travando o sistema.",
    "code": "#include <stdio.h>\n        #define N 4\n        \n        int graph[N][N] = {\n            {0, 1, 1, 0},\n            {1, 0, 0, 1},\n            {1, 0, 0, 1},\n            {0, 1, 1, 0}\n        };\n        \n        void bfs(int start) {\n            int queue[100];\n            int head = 0, tail = 0;\n            \n            queue[tail++] = start;\n            \n            // Erro: Nenhum array 'visited' é usado!\n            while (head < tail) {\n                int curr = queue[head++];\n                printf(\"Visitando: %d\n        \", curr);\n                \n                for (int i = 0; i < N; i++) {\n                    if (graph[curr][i] == 1) {\n                        queue[tail++] = i;\n                    }\n                }\n            }\n        }",
    "correction": "// Usar array de visited\n            int visited[N] = {0};\n            visited[start] = 1;\n            // Dentro do loop:\n                    if (graph[curr][i] == 1 && !visited[i]) {\n                        visited[i] = 1;\n                        queue[tail++] = i;\n                    }"
},
    {
    "title": "Código 02: DFS (Estouro de Pilha no Grafo)",
    "error_description": "Grafo gigante com Busca em Profundidade DFS recursiva causa Stack Overflow.",
    "code": "#include <stdio.h>\n        \n        void dfs(int curr, int visited[], int graph[][10000], int n) {\n            visited[curr] = 1;\n            \n            for (int i = 0; i < n; i++) {\n                // Se n for 10000 e o grafo for uma lista encadeada (pior caso),\n                // a profundidade da recursão será 10000, estourando a call stack de C.\n                if (graph[curr][i] == 1 && !visited[i]) {\n                    dfs(i, visited, graph, n);\n                }\n            }\n        }\n        // O erro conceitual é estrutural. Qual a correção?",
    "correction": "// Converter a DFS recursiva para DFS iterativa com uma estrutura de Pilha (Stack) alocada na Heap."
},
    {
    "title": "Código 03: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 04: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 05: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 06: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 07: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 08: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 09: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 10: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 11: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 12: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 13: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 14: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 15: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: Colisões (Encadeamento Cíclico)",
    "error_description": "Tratamento de colisão por encadeamento aberto insere nós de forma errada na lista ligada, criando ciclos infinitos.",
    "code": "#include <stdlib.h>\n        \n        typedef struct Node { int val; struct Node* next; } Node;\n        \n        Node* table[10] = {NULL};\n        \n        void insert(int key, int val) {\n            int idx = key % 10;\n            Node* n = malloc(sizeof(Node));\n            n->val = val;\n            \n            // Erro: Insere no final mas esquece de setar n->next = NULL\n            if (!table[idx]) {\n                table[idx] = n;\n            } else {\n                Node* curr = table[idx];\n                while (curr->next) curr = curr->next;\n                curr->next = n;\n                // n->next contém lixo de memória e aponta para sabe-se lá onde\n            }\n        }",
    "correction": "// Inicializar o next do novo nó\n            n->next = NULL;"
},
    {
    "title": "Código 02: Resize Catastrófico de Tabela Hash",
    "error_description": "Ao duplicar o tamanho da tabela, a função esquece de re-hashear os elementos antigos.",
    "code": "#include <stdlib.h>\n        int* table;\n        int capacity = 10;\n        \n        void resize() {\n            int old_cap = capacity;\n            capacity *= 2;\n            int* new_table = calloc(capacity, sizeof(int));\n            \n            // Copiando bits diretamente. Erro: o índice hash original\n            // era (key % 10), na nova tabela deveria ser (key % 20).\n            for(int i = 0; i < old_cap; i++) {\n                new_table[i] = table[i];\n            }\n            \n            free(table);\n            table = new_table;\n        }",
    "correction": "// Deve-se re-calcular o hash para cada elemento\n            for(int i = 0; i < old_cap; i++) {\n                if(table[i] != 0) { // Se tem elemento\n                    int new_idx = table[i] % capacity; // (simplificação se a chave == val)\n                    // Lógica real exigiria ler a chave do elemento\n                }\n            }"
},
    {
    "title": "Código 03: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 04: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 05: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 06: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 07: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 08: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 09: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 10: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 11: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 12: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 13: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 14: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 15: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 01: Ponteiro Mágico [HARD]",
    "error_description": "Manipulação avançada de bits com XOR Linked List corrompendo endereço ao desfazer a operação.",
    "code": "#include <stdio.h>\n        #include <stdint.h>\n        \n        typedef struct Node {\n            int data;\n            struct Node* nxp; // XOR pointer\n        } Node;\n        \n        // XOR de dois ponteiros\n        Node* XOR(Node* a, Node* b) {\n            return (Node*)((uintptr_t)a ^ (uintptr_t)b);\n        }\n        \n        void insert(Node** head, int data) {\n            Node* n = (Node*)malloc(sizeof(Node));\n            n->data = data;\n            // O nxp é o XOR do anterior (NULL) e próximo (*head)\n            n->nxp = XOR(NULL, *head);\n            \n            if (*head != NULL) {\n                // Para atualizar o *head atual, precisamos do pxn antigo.\n                // Erro: calculando incorretamente!\n                Node* next_nxp = XOR(NULL, (*head)->nxp); \n                (*head)->nxp = XOR(n, next_nxp);\n            }\n            *head = n;\n        }",
    "correction": "// Para atualizar o nxp do *head antigo, você faz o XOR entre o novo nó (anterior a ele agora) e o próximo dele.\n                Node* next_node = XOR(NULL, (*head)->nxp); // Próximo original\n                (*head)->nxp = XOR(n, next_node);"
},
    {
    "title": "Código 02: Matriz Tridimensional Estourada [HARD]",
    "error_description": "Liberação de matriz 3D dinâmica resulta em Segfault pela ordem incorreta dos free().",
    "code": "#include <stdlib.h>\n        \n        void free_3d(int ***mat, int x, int y) {\n            // A matriz foi alocada como mat[x][y][z]\n            for (int i = 0; i < x; i++) {\n                free(mat[i]); // Erro Crítico: libera mat[i] antes de liberar mat[i][j]\n                for (int j = 0; j < y; j++) {\n                    free(mat[i][j]); \n                }\n            }\n            free(mat);\n        }",
    "correction": "// A ordem de liberação deve ser de dentro para fora\n            for (int i = 0; i < x; i++) {\n                for (int j = 0; j < y; j++) {\n                    free(mat[i][j]); \n                }\n                free(mat[i]);\n            }\n            free(mat);"
},
    {
    "title": "Código 03: Data Race Oculta (Threads C11) [HARD]",
    "error_description": "Mesmo usando mutexes, threads entram em Deadlock devido à inversão de ordem de aquisição.",
    "code": "#include <pthread.h>\n        \n        pthread_mutex_t m1 = PTHREAD_MUTEX_INITIALIZER;\n        pthread_mutex_t m2 = PTHREAD_MUTEX_INITIALIZER;\n        \n        void* threadA(void* arg) {\n            pthread_mutex_lock(&m1);\n            // processando algo\n            pthread_mutex_lock(&m2);\n            \n            pthread_mutex_unlock(&m2);\n            pthread_mutex_unlock(&m1);\n            return NULL;\n        }\n        \n        void* threadB(void* arg) {\n            pthread_mutex_lock(&m2);\n            // processando algo\n            pthread_mutex_lock(&m1);\n            \n            pthread_mutex_unlock(&m1);\n            pthread_mutex_unlock(&m2);\n            return NULL;\n        }\n        // O que causa o travamento (deadlock)?",
    "correction": "// A inversão da ordem dos locks causa Deadlock.\n        // Correção: sempre travar na mesma ordem.\n        void* threadB(void* arg) {\n            pthread_mutex_lock(&m1);\n            pthread_mutex_lock(&m2);\n            // ..."
},
    {
    "title": "Código 04: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 05: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 06: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 07: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 08: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 09: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 10: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 11: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 12: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 13: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 14: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 15: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 16: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 17: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 18: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 19: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 20: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 21: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
},
    {
    "title": "Código 22: (Vago - Novo Exercício em Breve)",
    "error_description": "Exercício a ser preenchido.",
    "code": "// Área reservada para futuro exercício\n    int main() {\n        return 0;\n    }",
    "correction": "// Correção pendente"
}
];
