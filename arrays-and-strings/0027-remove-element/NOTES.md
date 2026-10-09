# 27 — Remove Element

## 1. Informações gerais

- Dificuldade: Easy; categoria: Arrays and Strings.
- Link: <https://leetcode.com/problems/remove-element/>.
- Conceitos: array, sobrescrita in-place e dois ponteiros.

## 2. Entendendo o problema

Recebemos o array `nums` e o valor `val`. Devemos remover de `nums` todas as ocorrências de `val` e retornar `k`, a quantidade de valores que permaneceram. A solução não precisa alterar o tamanho físico do array: somente as posições de `0` até `k - 1` são parte do resultado. A ordem dos valores restantes pode mudar pelo contrato do LeetCode, embora esta implementação a preserve.

## 3. Exemplo de entrada e saída

Para `nums = [3, 2, 2, 3]` e `val = 3`, os valores válidos são `[2, 2]`. A função sobrescreve o começo de `nums` com esses valores e retorna `2`. Assim, a verificação relevante é `nums.slice(0, k)`, e não o conteúdo depois desse trecho.

## 4. Conhecimentos necessários

Dois ponteiros podem ter papéis diferentes: `i` lê todos os elementos originais e `k` indica a próxima posição disponível para escrever um elemento que deve permanecer. Copiar um elemento para uma posição anterior é seguro porque `k` nunca fica à frente de `i`.

## 5. Raciocínio inicial

Em vez de apagar cada ocorrência, operação que deslocaria elementos repetidamente, basta percorrer o array uma vez e compactar os valores diferentes de `val` no início. O número de cópias feitas é exatamente o número de valores que permanecem.

## 6. Abordagem ingênua

Uma abordagem com `splice` para cada ocorrência funciona, mas cada remoção pode deslocar o restante do array. Se houver muitas ocorrências, o custo total pode chegar a O(n²). Criar um novo array com `filter` evita esses deslocamentos, porém usa O(n) de memória auxiliar e não atende tão diretamente ao objetivo in-place.

## 7. Abordagem escolhida

Inicializamos `k` com zero. Para cada índice `i`, se `nums[i]` for diferente de `val`, copiamos esse número para `nums[k]` e incrementamos `k`. Quando `nums[i]` é igual a `val`, não escrevemos nada e `k` permanece apontando para a próxima lacuna a preencher.

## 8. Passo a passo da execução

Para `nums = [0, 1, 2, 2, 3, 0, 4, 2]` e `val = 2`:

| `i` | Valor lido | Ação | `k` depois | Prefixo válido |
| ---: | ---: | --- | ---: | --- |
| 0 | 0 | grava em `nums[0]` | 1 | `[0]` |
| 1 | 1 | grava em `nums[1]` | 2 | `[0, 1]` |
| 2 | 2 | ignora | 2 | `[0, 1]` |
| 3 | 2 | ignora | 2 | `[0, 1]` |
| 4 | 3 | grava em `nums[2]` | 3 | `[0, 1, 3]` |
| 5 | 0 | grava em `nums[3]` | 4 | `[0, 1, 3, 0]` |
| 6 | 4 | grava em `nums[4]` | 5 | `[0, 1, 3, 0, 4]` |
| 7 | 2 | ignora | 5 | `[0, 1, 3, 0, 4]` |

A função retorna `5`; as cinco primeiras posições são o resultado.

## 9. Análise do código

O `for` faz `i` visitar cada posição. A condição `nums[i] !== val` decide se o elemento entra no resultado. Dentro do `if`, `nums[k] = nums[i]` realiza a compactação e `k++` mantém o ponteiro de escrita pronto para o próximo valor válido. O `return k` entrega o tamanho do prefixo produzido.

## 10. Por que a solução funciona?

Invariante: após processar as posições de `0` a `i`, as primeiras `k` posições de `nums` contêm, na mesma ordem, todos e somente os valores desse trecho que são diferentes de `val`. Inicialmente isso vale para o prefixo vazio. Ao ler `val`, o prefixo válido não muda; ao ler outro valor, ele é acrescentado em `nums[k]`. Logo, ao final, o prefixo de tamanho `k` contém exatamente todos os valores que devem permanecer.

## 11. Complexidade temporal

O algoritmo percorre os `n` elementos uma única vez e executa trabalho constante por elemento. O tempo é O(n).

## 12. Complexidade espacial

Além do próprio array de entrada, são usadas apenas as variáveis `i` e `k`. O espaço auxiliar é O(1).

## 13. Casos extremos

- Array vazio retorna `0` sem fazer cópias.
- Se todos os elementos forem `val`, `k` permanece `0`.
- Se `val` não estiver no array, todos os elementos continuam no prefixo e `k === nums.length`.
- Valores repetidos, negativos e zero são tratados pela mesma comparação estrita.

## 14. Erros comuns

- Retornar o array em vez de retornar a quantidade `k`.
- Validar ou usar posições após `k`, que o problema não define como resultado.
- Incrementar `k` mesmo ao encontrar `val`.
- Usar `splice` durante a iteração sem ajustar o índice, o que pode pular elementos consecutivos.

## 15. Como reconhecer problemas semelhantes

Esta técnica serve quando se deseja manter no início de um array apenas elementos que passam por um critério: remover valores, filtrar inválidos ou compactar itens. Quando a estabilidade não é necessária e há muitos itens a remover, também pode ser útil trocar ocorrências com o fim do array, mas isso altera a ordem.

## 16. Testes

Os casos em `cases.json` cobrem o exemplo padrão, ocorrências espalhadas, ausência do valor-alvo, remoção total, array vazio e repetição de valores que devem permanecer. O teste confirma tanto o `k` retornado quanto o conteúdo das primeiras `k` posições, sem exigir qualquer conteúdo depois delas.

Status: testes ativos aprovados com `npm run test:exercise -- 27`.

## 17. Perguntas de revisão

1. O que representa `k` durante a execução?
2. Por que escrever em `nums[k]` não destrói um valor ainda necessário?
3. Por que apenas `nums.slice(0, k)` faz parte do contrato?
4. Qual custo adicional seria introduzido por construir um novo array?

## 18. Resumo do aprendizado

Dois ponteiros permitem filtrar `nums` in-place: um lê todos os elementos e o outro compacta os que devem ficar. A estratégia produz o tamanho correto e o prefixo válido em O(n) de tempo e O(1) de espaço auxiliar.
