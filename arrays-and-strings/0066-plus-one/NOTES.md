# 66 — Plus One

## Informações gerais

- Dificuldade: Easy; categoria: Arrays and Strings.
- Link: <https://leetcode.com/problems/plus-one/>.
- Conceitos: array de dígitos, transporte de vai-um e varredura reversa.

## Entendendo o problema

O array `digits` representa um inteiro não negativo: cada posição guarda um dígito e a primeira posição contém o dígito mais significativo. Devemos somar um ao número e retornar os dígitos resultantes. A soma pode criar uma nova posição, como em `[9, 9]`, cujo resultado é `[1, 0, 0]`.

## Abordagem escolhida

O laço percorre o array da direita para a esquerda, pois o último dígito é o primeiro afetado pela soma. Quando encontra um valor menor que `9`, incrementa esse valor e encerra. Um `9` se torna `0` e transmite o vai-um para a posição anterior. Se todos os dígitos eram `9`, insere `1` no início após o laço.

Para `[2, 9, 9]`, a execução transforma primeiro o último `9` em `0`, depois o segundo `9` em `0`, e então incrementa `2` para `3`, produzindo `[3, 0, 0]`.

## Por que funciona?

Em uma soma decimal, apenas os dígitos finais iguais a `9` precisam receber o transporte. O algoritmo troca cada um deles por `0` e continua; o primeiro dígito menor que `9` recebe exatamente um incremento, encerrando o transporte. Se não houver esse dígito, o transporte ultrapassa o início e `1` é o novo dígito mais significativo.

## Complexidade

- Tempo: O(n) no pior caso, quando todos os dígitos são `9`.
- Espaço auxiliar: O(1), pois as alterações ocorrem no array de entrada. O `unshift(1)` pode aumentar o próprio array de resultado.

## Casos extremos

- `[0]` retorna `[1]`.
- Um único `[9]` retorna `[1, 0]`.
- Vários `9` consecutivos propagam o transporte por todas as posições necessárias.
- Quando o último dígito é menor que `9`, apenas ele é alterado.

## Testes

Os casos cobrem incremento sem transporte, transporte simples, vários `9`, expansão do array, zero e dígitos repetidos no final.

Status: 7 testes ativos aprovados com `npm run test:exercise -- 66`.

## Resumo do aprendizado

Percorrer dígitos do fim para o início modela diretamente o transporte da adição decimal e evita converter o número para um tipo numérico que pode perder precisão.
