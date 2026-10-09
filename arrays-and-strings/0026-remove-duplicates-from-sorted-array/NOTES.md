# 26 — Remove Duplicates from Sorted Array

## Informações gerais

- Dificuldade: Easy; categoria: Arrays and Strings.
- Link: <https://leetcode.com/problems/remove-duplicates-from-sorted-array/>.
- Conceitos: array ordenado, dois ponteiros e modificação in-place.

## Entendendo o problema

O array `nums` já está em ordem não decrescente. Devemos remover duplicados in-place e retornar `k`, a quantidade de valores distintos. Apenas as posições de `0` até `k - 1` fazem parte do resultado; os valores depois desse prefixo não importam.

## Abordagem escolhida

O ponteiro `i` lê cada item a partir do segundo. O ponteiro `k` indica a próxima posição que receberá um valor novo. Como o array está ordenado, `nums[i]` só é diferente de `nums[k - 1]` quando representa um valor ainda não colocado no prefixo de valores distintos. Nesse caso, ele é escrito em `nums[k]` e `k` avança.

Para `[0, 0, 1, 1, 1, 2]`, o prefixo evolui de `[0]` para `[0, 1]` e depois `[0, 1, 2]`; a função retorna `3`.

## Por que funciona?

Após cada iteração, as primeiras `k` posições contêm exatamente os valores distintos já lidos, em ordem. A ordenação garante que todas as repetições de um valor aparecem antes de qualquer valor maior, então comparar com o último item do prefixo é suficiente para decidir se o item atual é novo. Ao terminar a leitura, o invariante fornece o prefixo completo e `k` correto.

## Complexidade

- Tempo: O(n), pois cada posição é lida uma vez.
- Espaço auxiliar: O(1), pois são usados apenas os ponteiros `i` e `k` além do array de entrada.

## Casos extremos

- Array vazio retorna `0` imediatamente.
- Um único elemento retorna `1`.
- Um array sem duplicados mantém todos os valores.
- Quando todos os valores são iguais, somente o primeiro permanece no prefixo.

## Testes

Os casos cobrem uma repetição simples, diversas repetições, array já único, array unitário e array vazio. Os testes confirmam `k` e o conteúdo de `nums.slice(0, k)`.

Status: testes ativos aprovados com `npm run validate`.

## Resumo do aprendizado

Em arrays ordenados, comparar cada valor com o último valor mantido permite eliminar duplicados em uma única passada, sem criar outro array.
