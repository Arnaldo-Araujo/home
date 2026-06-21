const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'exercicios.js');
let content = fs.readFileSync(file, 'utf8');

const newExercises = [
    // ═══════════════════════════════════════════════════════════════════════════
    // MÓDULO 5: Estruturas de Dados Lineares (Filas, Pilhas, Listas)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Código 23: Pilha sem Fundo (Stack Underflow)",
        error_description: "A função de pop tenta retirar de uma pilha vazia e acessa um índice negativo.",
        code: `// Implementação de uma Pilha em C
#include <stdio.h>
#define MAX 5

int stack[MAX];
int top = 0; // Erro lógico: top indica o próximo espaço vazio

void push(int val) {
    if (top < MAX) {
        stack[top++] = val;
    }
}

int pop() {
    // Retira o elemento do topo da pilha
    return stack[--top];
}

int main() {
    push(10);
    pop();
    // Esta chamada causará underflow e acessará stack[-1]
    int val = pop();
    printf("Valor retirado: %d\\n", val);
    return 0;
}`,
        correction: `// Antes de decrementar e acessar, deve-se verificar se a pilha não está vazia.
int pop() {
    if (top > 0) {
        return stack[--top];
    }
    return -1; // Sinaliza erro
}`
    },
    {
        title: "Código 23-A: Fila Circular Sobreposta",
        error_description: "Fila circular perde o controle de tamanho e sobrepõe os dados sem verificar o limite.",
        code: `// Fila Circular (Circular Queue)
#include <stdio.h>
#define SIZE 3

int queue[SIZE];
int head = 0, tail = 0;

void enqueue(int val) {
    queue[tail] = val;
    tail = (tail + 1) % SIZE;
    // Faltou verificar se head == tail (Fila cheia)
}

int main() {
    enqueue(1);
    enqueue(2);
    enqueue(3);
    enqueue(4); // Vai sobrescrever o elemento '1' silenciosamente
    printf("Head aponta para: %d\\n", queue[head]);
    return 0;
}`,
        correction: `// Adicionar uma variável "count" ou verificar (tail + 1) % SIZE == head
int count = 0;
void enqueue(int val) {
    if (count < SIZE) {
        queue[tail] = val;
        tail = (tail + 1) % SIZE;
        count++;
    }
}`
    },
    {
        title: "Código 23-B: Lista Encadeada Perdida",
        error_description: "Avanço do ponteiro head diretamente causa memory leak de todos os nós removidos.",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* head = NULL;

void remove_first() {
    if (head != NULL) {
        // Erro: avança o head mas não dá free() no nó antigo!
        head = head->next;
    }
}

int main() {
    head = malloc(sizeof(Node));
    head->data = 10;
    head->next = NULL;
    remove_first();
    return 0;
}`,
        correction: `// Deve-se guardar o ponteiro original antes de avançar o head
void remove_first() {
    if (head != NULL) {
        Node* temp = head;
        head = head->next;
        free(temp);
    }
}`
    },
    {
        title: "Código 24: Lista Duplamente Encadeada (Nó Isolado)",
        error_description: "Erro ao remover nó do meio: o ponteiro 'prev' do próximo nó não foi atualizado.",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
} Node;

void remove_node(Node* target) {
    if (!target) return;
    
    if (target->prev) {
        target->prev->next = target->next;
    }
    // Erro: não atualiza o ponteiro prev do target->next
    
    free(target);
}`,
        correction: `// Atualizar o ponteiro prev do próximo nó
void remove_node(Node* target) {
    if (!target) return;
    if (target->prev) target->prev->next = target->next;
    if (target->next) target->next->prev = target->prev;
    free(target);
}`
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MÓDULO 6: Ordenações (Sorting Avançado)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Código 25: QuickSort Recursão Infinita",
        error_description: "O particionamento do QuickSort usa índices de forma que causa loop infinito se existirem elementos duplicados repetidos.",
        code: `#include <stdio.h>

void quicksort(int arr[], int left, int right) {
    if (left >= right) return;
    
    int pivot = arr[left];
    int i = left, j = right;
    
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            // Erro: faltou incrementar i e decrementar j aqui!
            // Causa loop infinito se arr[i] == pivot e arr[j] == pivot.
        }
    }
    
    quicksort(arr, left, j);
    quicksort(arr, i, right);
}`,
        correction: `// Deve incrementar i e decrementar j logo após a troca
        if (i <= j) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }`
    },
    {
        title: "Código 25-A: Merge Sort Vazamento de Memória",
        error_description: "Merge Sort aloca array temporário dinamicamente em cada recursão, mas esquece de liberar.",
        code: `#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    
    // Aloca arrays temporários
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    
    // Erro: Memory leak. Os arrays L e R não recebem free() no final.
}`,
        correction: `// Adicionar free no final da função
    free(L);
    free(R);
}`
    },
    {
        title: "Código 25-B: Heap Sort (Fora dos Limites)",
        error_description: "Cálculo do filho esquerdo em árvore representada por array causa Out of Bounds.",
        code: `#include <stdio.h>

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i;      // Erro: em arrays 0-indexados, o filho esquerdo é 2*i + 1
    int right = 2 * i + 1; // Erro: e o direito é 2*i + 2
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
        
    if (right < n && arr[right] > arr[largest])
        largest = right;
        
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}`,
        correction: `// Aritmética de índices 0-based
    int left = 2 * i + 1;
    int right = 2 * i + 2;`
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MÓDULO 7: Ponteiros (Avançado)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Código 26: Ponteiro Duplo Mal Alocado",
        error_description: "Tentativa de alocar uma matriz dinâmica resulta em Segmentation Fault pois o array de ponteiros não foi inicializado corretamente.",
        code: `#include <stdlib.h>

int** create_matrix(int rows, int cols) {
    // Erro: alocando sizeof(int) em vez de sizeof(int*)
    int** matrix = malloc(rows * sizeof(int));
    
    for(int i = 0; i < rows; i++) {
        matrix[i] = malloc(cols * sizeof(int));
    }
    return matrix;
}`,
        correction: `// O array primário deve ser um array de ponteiros para int
    int** matrix = malloc(rows * sizeof(int*));`
    },
    {
        title: "Código 26-A: Ponteiro de Função Incompatível",
        error_description: "Uso de casting forçado para ponteiro de função destrói o comportamento na chamada.",
        code: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    // Erro de casting: A assinatura de ponteiro de função está errada
    void (*func_ptr)() = (void (*)()) add;
    
    // Comportamento indefinido!
    int result = ((int (*)(int, int))func_ptr)(5, 10);
    printf("%d\\n", result);
    return 0;
}`,
        correction: `// Deve-se declarar o ponteiro de função com a assinatura correta
    int (*func_ptr)(int, int) = add;
    int result = func_ptr(5, 10);`
    },
    {
        title: "Código 26-B: Aritmética Cega",
        error_description: "Aritmética de ponteiros subtraindo ponteiros de tipos incompatíveis ou operando sobre void* (ilegal em C padrão).",
        code: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    void* ptr1 = &arr[0];
    void* ptr2 = &arr[3];
    
    // GCC permite aritmética com void* como extensão, mas o padrão C proíbe.
    // O erro real: o avanço numérico em void* é tratado como bytes (1),
    // logo a distância não será 3, mas 3 * sizeof(int).
    int diff = ptr2 - ptr1;
    printf("Diferença de índices: %d\\n", diff);
    return 0;
}`,
        correction: `// Converter para int* antes da aritmética
    int diff = (int*)ptr2 - (int*)ptr1;`
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MÓDULO 8: Árvores (Avançado)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Código 27: AVL - Rotação Incompleta",
        error_description: "Rotação à direita em uma árvore AVL perde o filho esquerdo do novo nó raiz.",
        code: `typedef struct Node {
    int key;
    struct Node *left;
    struct Node *right;
    int height;
} Node;

Node *rightRotate(Node *y) {
    Node *x = y->left;
    Node *T2 = x->right;

    // Rotação
    x->right = y;
    // Erro: y->left deve receber T2 para não perder a sub-árvore
    // y->left = NULL; 
    
    return x;
}`,
        correction: `// Transferir a sub-árvore direita de x para a esquerda de y
    y->left = T2;`
    },
    {
        title: "Código 27-A: Remoção com 2 Filhos (BST)",
        error_description: "Ao remover um nó com 2 filhos, o nó substituto não é corretamente removido de sua posição original.",
        code: `#include <stdlib.h>
typedef struct Node { int key; struct Node *left, *right; } Node;

Node* minValueNode(Node* node) {
    Node* current = node;
    while (current && current->left != NULL) current = current->left;
    return current;
}

Node* deleteNode(Node* root, int key) {
    if (root == NULL) return root;
    if (key < root->key) root->left = deleteNode(root->left, key);
    else if (key > root->key) root->right = deleteNode(root->right, key);
    else {
        if (root->left == NULL) return root->right;
        else if (root->right == NULL) return root->left;
        
        Node* temp = minValueNode(root->right);
        root->key = temp->key;
        // Erro: O temp ainda existe na sub-árvore direita! 
        // Ele precisa ser deletado da raiz original.
    }
    return root;
}`,
        correction: `// Deletar o sucessor inorder da sub-árvore direita
        root->right = deleteNode(root->right, temp->key);`
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MÓDULO 9: Grafos
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Código 28: BFS em Loop Infinito",
        error_description: "Busca em largura em grafo com ciclos (cíclico) não marca nós como visitados, travando o sistema.",
        code: `#include <stdio.h>
#define N 4

int graph[N][N] = {
    {0, 1, 1, 0},
    {1, 0, 0, 1},
    {1, 0, 0, 1},
    {0, 1, 1, 0}
};

void bfs(int start) {
    int queue[100];
    int head = 0, tail = 0;
    
    queue[tail++] = start;
    
    // Erro: Nenhum array 'visited' é usado!
    while (head < tail) {
        int curr = queue[head++];
        printf("Visitando: %d\\n", curr);
        
        for (int i = 0; i < N; i++) {
            if (graph[curr][i] == 1) {
                queue[tail++] = i;
            }
        }
    }
}`,
        correction: `// Usar array de visited
    int visited[N] = {0};
    visited[start] = 1;
    // Dentro do loop:
            if (graph[curr][i] == 1 && !visited[i]) {
                visited[i] = 1;
                queue[tail++] = i;
            }`
    },
    {
        title: "Código 28-A: DFS (Estouro de Pilha no Grafo)",
        error_description: "Grafo gigante com Busca em Profundidade DFS recursiva causa Stack Overflow.",
        code: `#include <stdio.h>

void dfs(int curr, int visited[], int graph[][10000], int n) {
    visited[curr] = 1;
    
    for (int i = 0; i < n; i++) {
        // Se n for 10000 e o grafo for uma lista encadeada (pior caso),
        // a profundidade da recursão será 10000, estourando a call stack de C.
        if (graph[curr][i] == 1 && !visited[i]) {
            dfs(i, visited, graph, n);
        }
    }
}
// O erro conceitual é estrutural. Qual a correção?`,
        correction: `// Converter a DFS recursiva para DFS iterativa com uma estrutura de Pilha (Stack) alocada na Heap.`
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MÓDULO 10: Lista de Dispersão (Hash) Avançada
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Código 29: Colisões (Encadeamento Cíclico)",
        error_description: "Tratamento de colisão por encadeamento aberto insere nós de forma errada na lista ligada, criando ciclos infinitos.",
        code: `#include <stdlib.h>

typedef struct Node { int val; struct Node* next; } Node;

Node* table[10] = {NULL};

void insert(int key, int val) {
    int idx = key % 10;
    Node* n = malloc(sizeof(Node));
    n->val = val;
    
    // Erro: Insere no final mas esquece de setar n->next = NULL
    if (!table[idx]) {
        table[idx] = n;
    } else {
        Node* curr = table[idx];
        while (curr->next) curr = curr->next;
        curr->next = n;
        // n->next contém lixo de memória e aponta para sabe-se lá onde
    }
}`,
        correction: `// Inicializar o next do novo nó
    n->next = NULL;`
    },
    {
        title: "Código 29-A: Resize Catastrófico de Tabela Hash",
        error_description: "Ao duplicar o tamanho da tabela, a função esquece de re-hashear os elementos antigos.",
        code: `#include <stdlib.h>
int* table;
int capacity = 10;

void resize() {
    int old_cap = capacity;
    capacity *= 2;
    int* new_table = calloc(capacity, sizeof(int));
    
    // Copiando bits diretamente. Erro: o índice hash original
    // era (key % 10), na nova tabela deveria ser (key % 20).
    for(int i = 0; i < old_cap; i++) {
        new_table[i] = table[i];
    }
    
    free(table);
    table = new_table;
}`,
        correction: `// Deve-se re-calcular o hash para cada elemento
    for(int i = 0; i < old_cap; i++) {
        if(table[i] != 0) { // Se tem elemento
            int new_idx = table[i] % capacity; // (simplificação se a chave == val)
            // Lógica real exigiria ler a chave do elemento
        }
    }`
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MÓDULO 11: HARD (Modo Sobrevivência)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Código 30: Ponteiro Mágico [HARD]",
        error_description: "Manipulação avançada de bits com XOR Linked List corrompendo endereço ao desfazer a operação.",
        code: `#include <stdio.h>
#include <stdint.h>

typedef struct Node {
    int data;
    struct Node* nxp; // XOR pointer
} Node;

// XOR de dois ponteiros
Node* XOR(Node* a, Node* b) {
    return (Node*)((uintptr_t)a ^ (uintptr_t)b);
}

void insert(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = data;
    // O nxp é o XOR do anterior (NULL) e próximo (*head)
    n->nxp = XOR(NULL, *head);
    
    if (*head != NULL) {
        // Para atualizar o *head atual, precisamos do pxn antigo.
        // Erro: calculando incorretamente!
        Node* next_nxp = XOR(NULL, (*head)->nxp); 
        (*head)->nxp = XOR(n, next_nxp);
    }
    *head = n;
}`,
        correction: `// Para atualizar o nxp do *head antigo, você faz o XOR entre o novo nó (anterior a ele agora) e o próximo dele.
        Node* next_node = XOR(NULL, (*head)->nxp); // Próximo original
        (*head)->nxp = XOR(n, next_node);`
    },
    {
        title: "Código 30-A: Matriz Tridimensional Estourada [HARD]",
        error_description: "Liberação de matriz 3D dinâmica resulta em Segfault pela ordem incorreta dos free().",
        code: `#include <stdlib.h>

void free_3d(int ***mat, int x, int y) {
    // A matriz foi alocada como mat[x][y][z]
    for (int i = 0; i < x; i++) {
        free(mat[i]); // Erro Crítico: libera mat[i] antes de liberar mat[i][j]
        for (int j = 0; j < y; j++) {
            free(mat[i][j]); 
        }
    }
    free(mat);
}`,
        correction: `// A ordem de liberação deve ser de dentro para fora
    for (int i = 0; i < x; i++) {
        for (int j = 0; j < y; j++) {
            free(mat[i][j]); 
        }
        free(mat[i]);
    }
    free(mat);`
    },
    {
        title: "Código 30-B: Data Race Oculta (Threads C11) [HARD]",
        error_description: "Mesmo usando mutexes, threads entram em Deadlock devido à inversão de ordem de aquisição.",
        code: `#include <pthread.h>

pthread_mutex_t m1 = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t m2 = PTHREAD_MUTEX_INITIALIZER;

void* threadA(void* arg) {
    pthread_mutex_lock(&m1);
    // processando algo
    pthread_mutex_lock(&m2);
    
    pthread_mutex_unlock(&m2);
    pthread_mutex_unlock(&m1);
    return NULL;
}

void* threadB(void* arg) {
    pthread_mutex_lock(&m2);
    // processando algo
    pthread_mutex_lock(&m1);
    
    pthread_mutex_unlock(&m1);
    pthread_mutex_unlock(&m2);
    return NULL;
}
// O que causa o travamento (deadlock)?`,
        correction: `// A inversão da ordem dos locks causa Deadlock.
// Correção: sempre travar na mesma ordem.
void* threadB(void* arg) {
    pthread_mutex_lock(&m1);
    pthread_mutex_lock(&m2);
    // ...`
    }
];

// O arquivo original termina com `];`. Vamos tirar o fechamento e append os novos.
content = content.trim();
if (content.endsWith('];')) {
    content = content.slice(0, -2);
    if (!content.endsWith(',')) {
        content += ',\\n';
    }
    
    let toAppend = newExercises.map(ex => {
        let lines = JSON.stringify(ex, null, 4).split('\\n');
        return lines.map((l, i) => i === 0 ? "    " + l : "    " + l).join('\\n');
    }).join(',\\n');
    
    content += toAppend + '\\n];\\n';
    fs.writeFileSync(file, content, 'utf8');
    console.log('Exercícios injetados com sucesso! Total adicionado: ' + newExercises.length);
} else {
    console.log('Erro: Array exercisesData não pôde ser analisado.');
}
