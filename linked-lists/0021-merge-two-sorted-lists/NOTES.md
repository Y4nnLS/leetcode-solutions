# 21 — Merge Two Sorted Lists

## 1. Informações gerais

- Dificuldade: Easy; categoria: Linked Lists.
- Link: <https://leetcode.com/problems/merge-two-sorted-lists/>.
- Conceitos: `ListNode`, referências, ponteiros e lista encadeada ordenada.

## 2. Entendendo o problema

Uma Linked List é formada por nós. Cada `ListNode` possui `val` (seu valor) e `next` (referência para o próximo nó ou `null`). As duas listas já são ordenadas; devemos conectá-las em uma única lista ordenada, reutilizando os nós existentes.

## 3. Exemplos de entrada e saída

`[1,2,4]` e `[1,3,4]` produzem `[1,1,2,3,4,4]`. Nos testes, arrays servem apenas para montar e ler `ListNode`s; a solução não transforma listas em arrays.

## 4. Conhecimentos necessários

Em JavaScript, uma variável de nó guarda uma referência ao objeto. Mudar `current.next` conecta referências; não copia valores. Percorrer uma lista significa seguir `next` até `null`.

## 5. Raciocínio inicial

Os menores nós restantes são sempre os cabeçalhos de `list1` e `list2`. Ao escolher o menor deles repetidamente, mantemos a ordenação. É preciso guardar um início estável para não perder a referência da lista construída.

## 6. Abordagem ingênua

Poderíamos copiar todos os valores, ordenar e criar novos nós, mas isso ignora a ordenação já existente e usa memória extra. Comparar cabeçalhos aproveita a propriedade da entrada.

## 7. Abordagem escolhida

Um nó `dummy` é um início temporário sem valor relevante. `current` aponta para a última posição já construída. Enquanto ambas listas existirem, conectamos o nó de menor `val`, avançamos a lista escolhida e depois `current`. Ao fim, uma lista já acabou; anexamos o restante da outra. O retorno é `dummy.next`.

## 8. Passo a passo da execução

Para `1 → 2 → 4` e `1 → 3 → 4`:

| Comparação | Nó conectado | Lista 1 restante | Lista 2 restante | Resultado após dummy |
| --- | --- | --- | --- | --- |
| 1 e 1 | 1 da lista 1 | 2→4 | 1→3→4 | 1 |
| 2 e 1 | 1 da lista 2 | 2→4 | 3→4 | 1→1 |
| 2 e 3 | 2 | 4 | 3→4 | 1→1→2 |
| 4 e 3 | 3 | 4 | 4 | 1→1→2→3 |

Depois conectamos 4 e 4 restantes: `1→1→2→3→4→4`.

## 9. Análise do código

`dummy` evita casos especiais para o primeiro nó. `current.next = list1` ou `list2` conecta um nó existente. Em seguida a lista escolhida avança com `.next`; `current` avança para o nó anexado. A última atribuição anexa uma cauda já ordenada.

## 10. Por que a solução funciona?

Em cada iteração, o menor nó de todas as opções restantes está em um dos dois cabeçalhos. Escolhê-lo não viola a ordem do resultado; ele também é removido da lista de origem ao avançar seu ponteiro. O invariante é que a sequência após `dummy` está ordenada e contém exatamente os nós já escolhidos. A cauda restante pode ser anexada porque todos os seus valores são maiores ou iguais ao último escolhido.

## 11. Complexidade temporal

Se as listas têm `m` e `n` nós, cada nó é comparado/ligado no máximo uma vez. O tempo é O(m + n).

## 12. Complexidade espacial

A solução cria apenas o objeto sentinela e ponteiros; usa O(1) de espaço auxiliar. Os nós de entrada são reutilizados, não há uma nova lista completa de valores.

## 13. Casos extremos

As duas listas podem ser vazias. Se uma estiver vazia, a outra é anexada imediatamente. Valores iguais são aceitos; `<=` escolhe a primeira lista nesses empates. Os utilitários de teste detectam ciclos e limitam o número de nós percorridos.

## 14. Erros comuns

- Perder o primeiro nó por não usar `dummy` nem guardar `head`.
- Avançar a lista errada depois de conectar um nó.
- Criar arrays dentro da solução em vez de manipular referências.
- Esquecer de anexar a cauda restante.

## 15. Como reconhecer problemas semelhantes

Quando duas sequências ordenadas precisam ser combinadas, comparar seus primeiros elementos e avançar o menor é a base do passo de merge do merge sort.

## 16. Perguntas de revisão

1. Qual a diferença entre copiar um valor e conectar uma referência?
2. Por que `dummy.next` é retornado?
3. O que `current` representa durante o laço?
4. Por que basta anexar a lista restante ao fim?
5. Qual é o custo auxiliar da solução?

## 17. Resumo do aprendizado

O merge usa ponteiros e um nó sentinela para ligar, em ordem, os nós já existentes. Cada nó é processado uma vez, sem converter a estrutura para array.
