### Módulo 1: Sintaxe e Conceitos Básicos (C/C++)

(Erros baseados na seção "Erros comuns de programação" dos livros texto)

Código 01: Entrada de dados

```c

#include <stdio.h>

int main(void) {

int idade;

printf("Digite sua idade: ");

scanf("%d", idade); 

printf("Voce tem %d anos.\n", idade);

return 0;

}

```

Código 02: Comentários

```c

#include <stdio.h>

int main(void) {

/* Imprime uma mensagem de boas-vindas na tela 

e finaliza o programa 

printf("Bem-vindo a C!\n");

return 0;

}

```

Código 03: Controle de Formato

```c

#include <stdio.h>

int main(void) {

int numero = 42;

printf("O valor da variavel e d\n", numero);

return 0;

}

```

Código 04: Tomada de Decisão

```c

#include <stdio.h>

int main(void) {

int a = 5;

// Verifica se 'a' é igual a 10

if (a = 10) {

printf("A e igual a 10!\n");

} else {

printf("A e diferente de 10!\n");

}

return 0;

}

```

Código 05: Conceitos de Memória e Inicialização

```c

#include <stdio.h>

int main(void) {

int soma;

int valor = 10;

soma = soma + valor;

printf("O resultado da soma e: %d\n", soma);

return 0;

}

```

Código 06: Aspas Duplas

```c

#include <stdio.h>

int main(void) {

printf(Olá, Mundo da Programacao!\n);

return 0;

}

```

### Módulo 2: Alocação Dinâmica de Memória e Ponteiros

Código 07: Omissão de tamanho correto

```c

#include <stdio.h>

#include <stdlib.h>

int main(void) {

int *vetor;

/* Tenta alocar memória para um vetor de 5 números inteiros */

vetor = (int *) malloc(5); 

for(int i = 0; i < 5; i++) {

vetor[i] = i * 10;

printf("%d ", vetor[i]);

}

free(vetor);

return 0;

}

```

Código 08: Fuga de Memória (Memory Leak)

```c

#include <stdio.h>

#include <stdlib.h>

void criar_e_usar_vetor() {

int *p = (int *) malloc(10 * sizeof(int));

p[0] = 100;

printf("O primeiro valor e: %d\n", p[0]);

/* A função termina aqui */

}

int main(void) {

criar_e_usar_vetor();

printf("Fim do programa.\n");

return 0;

}

```

Código 09: Ponteiro Pendente (Dangling Pointer)

```c

#include <stdio.h>

#include <stdlib.h>

int main(void) {

int *ptr = (int *) malloc(sizeof(int));

*ptr = 50;

printf("Valor original: %d\n", *ptr);

free(ptr); 

/* Mais código é executado... e de repente: */

*ptr = 100; 

printf("Novo valor: %d\n", *ptr);

return 0;

}

```

Código 10: Incompatibilidade de Alocação/Libertação (C++)

```c++

#include <iostream>

int main() {

// Aloca um array de 20 inteiros

int *array = new int[20];

for(int i = 0; i < 20; i++){

array[i] = i;

}

// Liberta a memória alocada

delete array; 

return 0;

}

```

Código 11: Falta de verificação de Segurança

```c

#include <stdio.h>

#include <stdlib.h>

int main(void) {

/* Tentativa de alocar uma quantidade gigantesca de memória */

long long int tamanho_gigante = 9999999999999999;

int *ptr = (int *) malloc(tamanho_gigante * sizeof(int));

/* Utilização imediata do ponteiro */

ptr[0] = 10; 

printf("Valor: %d\n", ptr[0]);

free(ptr);

return 0;

}

```

Código 12: Tempo de Vida da Variável (Escopo Local)

```c

#include <stdio.h>

int* obter_numero_magico() {

int numero = 42;

return &numero; 

}

int main(void) {

int *p = obter_numero_magico();

printf("O numero magico e: %d\n", *p);

return 0;

}

```

Estes são clássicos e muito frequentes em trabalhos académicos e na indústria!

### Módulo 3: Manipulação de Ficheiros e Registos

Código 13: O ficheiro esquecido

```c

#include <stdio.h>

int main(void) {

FILE *ficheiro = fopen("dados_importantes.txt", "w");

if (ficheiro != NULL) {

fprintf(ficheiro, "A gravar informações cruciais no ficheiro...\n");

printf("Dados gravados com sucesso!\n");

/* O programa faz outras coisas e termina */

}

return 0;

}

```

Código 14: Confiança cega

```c

#include <stdio.h>

int main(void) {

FILE *ficheiro = fopen("configuracoes_ocultas.txt", "r");

char linha[100];

/* Tentativa imediata de ler o ficheiro */

fgets(linha, 100, ficheiro);

printf("A primeira linha lida foi: %s\n", linha);

fclose(ficheiro);

return 0;

}

```

Código 15: Conflito de Modos

```c

#include <stdio.h>

int main(void) {

/* Abre o ficheiro para leitura ("r") */

FILE *ficheiro = fopen("log_do_sistema.txt", "r"); 

if (ficheiro != NULL) {

/* Tenta escrever uma nova entrada no log */

fprintf(ficheiro, "NOVO REGISTO: O sistema iniciou corretamente.\n");

fclose(ficheiro);

printf("Log atualizado.\n");

} else {

printf("Erro ao abrir o ficheiro.\n");

}

return 0;

}

```

Código 16: O fantasma do EOF (End of File)

```c

#include <stdio.h>

int main(void) {

FILE *ficheiro = fopen("letras.txt", "r");

char c;

if (ficheiro != NULL) {

/* Loop para ler até ao fim do ficheiro */

while (!feof(ficheiro)) {

c = fgetc(ficheiro);

printf("%c", c);

}

fclose(ficheiro);

}

return 0;

}

```

Código 17: Gravando o endereço em vez do dado (Ficheiros Binários)

```c

#include <stdio.h>

#include <stdlib.h>

#include <string.h>

typedef struct {

int id;

char nome[50];

} RegistoAluno;

int main(void) {

RegistoAluno *aluno = (RegistoAluno *) malloc(sizeof(RegistoAluno));

aluno->id = 101;

strcpy(aluno->nome, "Maria Silva");

FILE *ficheiro = fopen("alunos.bin", "wb");

if (ficheiro != NULL) {

/* Tenta gravar a estrutura no ficheiro binário */

fwrite(&aluno, sizeof(RegistoAluno), 1, ficheiro);

fclose(ficheiro);

printf("Registo gravado.\n");

}

free(aluno);

return 0;

}

```

Esses erros são muito comuns nos laboratórios da disciplina!

### Módulo 4: Recursividade e Estruturas de Dados

Código 18: A Recursão Infinita

```c

#include <stdio.h>

/* Função para calcular o fatorial de um número */

int fatorial(int n) {

/* Tentativa de cálculo recursivo */

return n * fatorial(n - 1);

}

int main(void) {

int resultado = fatorial(5);

printf("O fatorial de 5 e: %d\n", resultado);

return 0;

}

```

Código 19: O Problema da Troca (Bubble Sort)

```c

#include <stdio.h>

void bubbleSort(int arr[], int n) {

for (int i = 0; i < n; i++) {

/* O laço interno tenta empurrar o maior elemento para o fim */

for (int j = 0; j < n; j++) {

if (arr[j] > arr[j + 1]) {

int temp = arr[j];

arr[j] = arr[j + 1];

arr[j + 1] = temp;

}

}

}

}

int main(void) {

int valores[] = {5, 2, 9, 1, 5};

bubbleSort(valores, 5);

printf("Primeiro valor: %d\n", valores[0]);

return 0;

}

```

Código 20: A Inserção Fantasma (Árvores Binárias)

```c

#include <stdio.h>

#include <stdlib.h>

typedef struct No {

int valor;

struct No *esq, *dir;

} No;

/* Função para inserir um valor numa Árvore Binária de Busca */

void inserir(No *raiz, int valor) {

if (raiz == NULL) {

raiz = (No *) malloc(sizeof(No));

raiz->valor = valor;

raiz->esq = NULL;

raiz->dir = NULL;

} else if (valor < raiz->valor) {

inserir(raiz->esq, valor);

} else {

inserir(raiz->dir, valor);

}

}

int main(void) {

No *arvore = NULL;

inserir(arvore, 10);

inserir(arvore, 5);

if (arvore != NULL) {

printf("A raiz da arvore e: %d\n", arvore->valor);

} else {

printf("A arvore continua vazia!\n");

}

return 0;

}

```

Código 21: Busca Binária Presa no Tempo

```c

#include <stdio.h>

int buscaBinaria(int vetor[], int tamanho, int alvo) {

int inicio = 0;

int fim = tamanho - 1;

while (inicio <= fim) {

int meio = (inicio + fim) / 2;

if (vetor[meio] == alvo) {

return meio; // Encontrou

}

if (vetor[meio] < alvo) {

inicio = meio; // Ajusta o início

} else {

fim = meio; // Ajusta o fim

}

}

return -1; // Não encontrou

}

```

Código 22: O Caos na Tabela de Dispersão (Hash)

```c

#include <stdio.h>

#define MAX_HASH 100

int tabela_hash[MAX_HASH];

/* Função para gerar o índice e inserir na tabela de dispersão */

void inserirHash(int chave_matricula, int valor) {

/* Utiliza a chave diretamente como índice */

int indice = chave_matricula; 

tabela_hash[indice] = valor;

printf("Valor inserido com sucesso!\n");

}

int main(void) {

/* Matrícula de um aluno (ex: 202610543) */

inserirHash(202610543, 10); 

return 0;

}

```

Parabéns por chegar até aqui! Completamos a nossa meta de 22 blocos de código repletos de problemas para treinar a sua visão como programador e depurador.

### Módulo 1: Sintaxe e Conceitos Básicos

Código 01: Entrada de dados

- O Erro: Na função scanf, faltou o operador de endereço & antes da variável idade. O scanf precisa saber o endereço de memória onde deve guardar o valor lido.
- Correção: scanf("%d", &idade);


Código 02: Comentários

- O Erro: O bloco de comentário não foi fechado. Utilizou-se /* para iniciar o comentário de múltiplas linhas, mas esqueceu-se de o fechar com */. O compilador vai ignorar o resto do código.
- Correção: Adicionar */ logo após a palavra "programa".


Código 03: Controle de Formato

- O Erro: O especificador de formato para um número inteiro é %d. No código, está apenas um d perdido no meio da string, o que fará com que imprima literalmente a letra "d".
- Correção: printf("O valor da variavel e %d\n", numero);


Código 04: Tomada de Decisão

- O Erro: Na instrução if (a = 10), está a ser feita uma atribuição (colocar o valor 10 em a) em vez de uma comparação. Como em C qualquer valor diferente de zero é verdadeiro, o bloco if será sempre executado.
- Correção: Usar o operador de igualdade duplo: if (a == 10)


Código 05: Conceitos de Memória e Inicialização

- O Erro: A variável soma foi declarada mas nunca inicializada. Em C, isso significa que ela conterá "lixo de memória" (um valor aleatório). Ao fazer soma = soma + valor;, o resultado será imprevisível.
- Correção: Inicializar a variável logo na declaração: int soma = 0;


Código 06: Aspas Duplas

- O Erro: Textos (strings literais) passados para a função printf precisam obrigatoriamente de estar entre aspas duplas " ".
- Correção: printf("Olá, Mundo da Programacao!\n");


### Módulo 2: Alocação Dinâmica de Memória e Ponteiros

Código 07: Omissão de tamanho correto

- O Erro: malloc(5) aloca apenas 5 bytes de memória. Um inteiro (int) normalmente ocupa 4 bytes. Ao tentar aceder a vetor[1] em diante, o programa estará a invadir memória não alocada (buffer overflow), causando corrupção ou Segmentation Fault.
- Correção: vetor = (int *) malloc(5 * sizeof(int));


Código 08: Fuga de Memória (Memory Leak)

- O Erro: A memória é alocada dinamicamente dentro da função criar_e_usar_vetor, mas nunca é libertada com a função free(). Quando a função termina, o ponteiro p desaparece, mas a memória continua ocupada (perdida).
- Correção: Adicionar free(p); antes do final da função criar_e_usar_vetor().


Código 09: Ponteiro Pendente (Dangling Pointer)

- O Erro: A memória para a qual ptr aponta foi libertada com free(ptr). No entanto, logo abaixo, o código tenta aceder a esse mesmo endereço desocupado (*ptr = 100;). Isso é um comportamento indefinido grave.
- Correção: Nunca aceder a ponteiros após o free. Uma boa prática é fazer ptr = NULL; logo a seguir à libertação.


Código 10: Incompatibilidade de Alocação/Libertação (C++)

- O Erro: Em C++, quando se aloca um array dinamicamente usando new[], é estritamente necessário libertá-lo usando delete[]. Usar apenas delete array; liberta apenas o primeiro elemento ou causa comportamento anómalo.
- Correção: delete[] array;


Código 11: Falta de verificação de Segurança

- O Erro: O código tenta alocar uma quantidade colossal de memória. Muito provavelmente, o malloc vai falhar e retornar um ponteiro NULL. O código a seguir assume que a alocação funcionou e tenta aceder a ptr[0], o que causará o colapso do programa se ptr for NULL.
- Correção: Sempre verificar se ptr != NULL antes de o utilizar.


Código 12: Tempo de Vida da Variável (Escopo Local)

- O Erro: A função devolve o endereço (&numero) de uma variável local. Quando a função obter_numero_magico termina, a variável numero é destruída. O ponteiro no main aponta agora para uma área de memória inválida.
- Correção: Alocar dinamicamente (malloc) dentro da função ou passar o ponteiro como argumento a partir do main.


### Módulo 3: Manipulação de Ficheiros e Registos

Código 13: O ficheiro esquecido

- O Erro: O ficheiro foi aberto com fopen mas nunca foi fechado com fclose. Isto pode impedir que os dados sejam efetivamente gravados no disco, mantendo-os num buffer de memória.
- Correção: Adicionar fclose(ficheiro); antes do final do bloco if.


Código 14: Confiança cega

- O Erro: O código não verifica se ficheiro é NULL. Se o ficheiro "configuracoes_ocultas.txt" não existir no disco, o fopen devolve NULL e a chamada subsequente a fgets irá rebentar com o programa (Segmentation Fault).
- Correção: Embrulhar a leitura com if (ficheiro != NULL) { ... }.


Código 15: Conflito de Modos

- O Erro: O ficheiro foi aberto explicitamente em modo de leitura "r" (read). Contudo, o código tenta escrever nele com fprintf. A gravação vai falhar silenciosamente ou o programa terá um comportamento inesperado.
- Correção: Abrir em modo de adição "a" (append) ou escrita "w" (write) se a intenção for gravar dados.


Código 16: O fantasma do EOF (End of File)

- O Erro: A função feof() só devolve verdadeiro depois de uma tentativa de leitura falhar. Isto faz com que o loop leia o último caractere, tente ler novamente, detete o final do ficheiro (EOF), e acabe por imprimir o último caractere duas vezes (ou lixo).
- Correção: Fazer a verificação da leitura diretamente: while ((c = fgetc(ficheiro)) != EOF) { printf("%c", c); }


Código 17: Gravando o endereço em vez do dado

- O Erro: A variável aluno já é um ponteiro. Quando se faz fwrite(&aluno, ...), em vez de gravar os dados do aluno (id e nome), está-se a gravar o endereço de memória do ponteiro no ficheiro binário.
- Correção: Remover o &. O correto é: fwrite(aluno, sizeof(RegistoAluno), 1, ficheiro);


### Módulo 4: Recursividade e Estruturas de Dados

Código 18: A Recursão Infinita

- O Erro: Falta a condição de paragem (caso base). A função fatorial vai chamar-se a si mesma com valores cada vez menores (5, 4, 3, 2, 1, 0, -1...) até a memória Stack estoirar (Stack Overflow).
- Correção: Adicionar um caso base no início da função: if (n <= 1) return 1;


Código 19: O Problema da Troca (Bubble Sort)

- O Erro: O laço interior vai de 0 até n-1 (pois j < n). Ao fazer arr[j + 1], quando j for 4 (o último índice válido num array de tamanho 5), ele vai aceder a arr[5], invadindo memória fora dos limites do vetor.
- Correção: O laço interno deve ser for (int j = 0; j < n - 1 - i; j++).


Código 20: A Inserção Fantasma (Árvores Binárias)

- O Erro: A passagem de raiz para a função inserir é feita por valor. A função aloca o nó numa cópia local do ponteiro raiz. Quando a função regressa, a variável arvore no main continua a valer NULL.
- Correção: Passar um ponteiro duplo void inserir(No raiz, int valor) e aceder via *raiz, ou então fazer com que a função devolva o nó atualizado No* inserir(No *raiz, int valor).


Código 21: Busca Binária Presa no Tempo

- O Erro: Se o elemento procurado não existir, o algoritmo pode entrar em loop infinito. Imagine que inicio e fim estão em posições adjacentes. Ao atualizar inicio = meio ou fim = meio, a diferença entre eles pode não diminuir devido ao arredondamento na divisão inteira.
- Correção: Os limites devem encolher passando do meio: inicio = meio + 1; ou fim = meio - 1;


Código 22: O Caos na Tabela de Dispersão (Hash)

- O Erro: A "função hash" está a usar o número de matrícula (ex: 202610543) diretamente como índice do vetor. No entanto, o nosso vetor tabela_hash só tem 100 posições (MAX_HASH). Tentar aceder ao índice 202610543 rebentará a memória do programa.
- Correção: Aplicar uma função de dispersão (hash) matemática limitadora, como o operador de módulo (resto da divisão): int indice = chave_matricula % MAX_HASH;

