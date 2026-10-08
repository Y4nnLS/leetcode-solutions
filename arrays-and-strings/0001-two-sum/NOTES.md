# 1 — Two Sum

## 1. Informações gerais

- Dificuldade: Easy; categoria: Arrays and Strings.
- Link: <https://leetcode.com/problems/two-sum/>.
- Conceitos: array, índice, complemento e `Map` (Hash Map).

## 2. Entendendo o problema

Recebemos `nums` e `target` e devemos retornar os **índices** de dois elementos distintos cuja soma seja `target`. Índice é a posição no array; valor é o número guardado nessa posição. O retorno não são os valores. O enunciado garante uma resposta válida, mas ela pode não ser única.

## 3. Exemplos de entrada e saída

Para `nums = [2, 7, 11, 15]` e `target = 9`, a resposta pode ser `[0, 1]`: os valores em `nums[0]` e `nums[1]` são 2 e 7. Para `[3, 3]` e 6, os dois índices devem ser diferentes, mesmo que os valores sejam iguais.

## 4. Conhecimentos necessários

Um Hash Map associa uma chave a um valor e permite consulta média em tempo constante. Aqui a chave é um número já visto e o valor é seu índice. O complemento de um valor é `target - valor`: é exatamente o número que falta para completar a soma.

## 5. Raciocínio inicial

É natural comparar cada valor com todos os seguintes. Porém, em vez de procurar repetidamente pelo parceiro, podemos guardar os valores anteriores e perguntar se o complemento atual já apareceu.

## 6. Abordagem ingênua

Dois laços percorrem pares de índices e testam a soma. Funciona, mas no pior caso compara aproximadamente `n² / 2` pares: tempo O(n²) e espaço O(1).

## 7. Abordagem escolhida

O laço percorre o array uma vez. Antes de registrar o valor atual, consulta o `Map` pelo seu complemento. Se ele existir, seu índice e o índice atual formam a resposta; caso contrário, registra `valor → índice`. Consultar antes de registrar também impede reutilizar o mesmo elemento.

## 8. Passo a passo da execução

Com `[2, 7, 11, 15]` e alvo 9:

| Iteração | Índice | Valor | Complemento | Map antes | Ação |
| --- | ---: | ---: | ---: | --- | --- |
| 1 | 0 | 2 | 7 | `{}` | guarda `2 → 0` |
| 2 | 1 | 7 | 2 | `{2 → 0}` | encontra 2 e retorna `[0, 1]` |

## 9. Análise do código

`indicesByValue.has(complement)` faz a consulta. `get` recupera o índice já salvo e `set` só ocorre se ainda não há par. O `return` encerra assim que o contrato é satisfeito.

## 10. Por que a solução funciona?

Antes de cada índice, o mapa contém exatamente valores de posições anteriores. Quando o complemento está nele, as duas posições são distintas e a soma é o alvo. Se ele não está, o valor atual fica disponível para índices futuros. Como uma resposta é garantida, algum par será encontrado.

## 11. Complexidade temporal

Cada um dos `n` valores é consultado e, no máximo, inserido uma vez. Operações médias de `Map` são O(1), portanto o tempo total é O(n), melhor que a força bruta O(n²).

## 12. Complexidade espacial

O mapa pode guardar até `n` pares valor–índice: O(n) de espaço auxiliar. O array de entrada não é alterado.

## 13. Casos extremos

Valores negativos, zero e duplicados funcionam porque chaves numéricas podem ser negativas ou repetidas; a segunda ocorrência consulta a primeira. Um array de dois itens é o menor caso permitido.

## 14. Erros comuns

- Retornar valores em vez de índices.
- Inserir antes de consultar e usar o mesmo índice duas vezes.
- Exigir uma ordem específica de índices quando mais de uma resposta é válida.

## 15. Como reconhecer problemas semelhantes

Quando há uma soma, diferença ou complemento a encontrar enquanto se percorre uma coleção, uma tabela de valores já vistos costuma evitar buscas repetidas.

## 16. Perguntas de revisão

1. Por que o complemento é `target - value`?
2. Qual informação o `Map` guarda e por quê?
3. Por que a ordem consulta-depois-insere importa?
4. Em que o Hash Map melhora a força bruta?

## 17. Resumo do aprendizado

Two Sum mostra como trocar comparações entre todos os pares por memória de valores anteriores: uma passada, consulta de complemento e retorno de índices distintos.
