# 14 — Longest Common Prefix

## 1. Informações gerais

- Dificuldade: Easy; categoria: Arrays and Strings.
- Link: <https://leetcode.com/problems/longest-common-prefix/>.
- Conceitos: strings, prefixo e redução incremental.

## 2. Entendendo o problema

Um prefixo é a parte inicial contínua de uma string; não é qualquer substring. Devemos retornar a maior sequência inicial compartilhada por todas as strings. Se não existir nem uma letra inicial comum, o retorno é a string vazia.

## 3. Exemplos de entrada e saída

Em `["flower", "flow", "flight"]`, o resultado é `"fl"`. Em `["dog", "racecar", "car"]`, é `""`, porque as primeiras letras já diferem.

## 4. Conhecimentos necessários

`startsWith(prefix)` verifica se uma string começa com determinado texto. `slice(0, -1)` remove o último caractere de um prefixo candidato. Essas operações permitem reduzir um candidato sem comparar índices manualmente.

## 5. Raciocínio inicial

O prefixo comum não pode ser maior que a primeira string. Podemos começar por ela e reduzi-la até que seja prefixo da próxima string, repetindo para todas.

## 6. Abordagem ingênua

Uma alternativa compara cada posição da primeira palavra com a mesma posição em todas as demais. É válida, mas exige controlar mais índices. A redução de um candidato torna a ideia explícita.

## 7. Abordagem escolhida

`prefix` inicia como `strs[0]`. Para cada outra string, o `while` encurta `prefix` enquanto ela não começar por ele. Quando termina, o candidato é comum a todas as strings já processadas. Se ficar vazio, não há mais trabalho.

## 8. Passo a passo da execução

Para `["flower", "flow", "flight"]`:

| String atual | Prefixo antes | Reduções | Prefixo depois |
| --- | --- | --- | --- |
| flow | flower | flower → flowe → flow | flow |
| flight | flow | flow → flo → fl | fl |

## 9. Análise do código

O laço externo visita strings a partir da segunda. A guarda `prefix.length > 0` evita trabalho depois de descobrir que não existe prefixo. O `while` mantém somente um prefixo que a string atual aceita.

## 10. Por que a solução funciona?

Antes de cada iteração, `prefix` é comum às strings anteriores. Reduzi-lo até ser início da string atual preserva essa propriedade e escolhe a maior possibilidade restante, pois remove caracteres apenas quando necessário. Ao fim, ele é o maior prefixo comum de todas.

## 11. Complexidade temporal

Considerando `S` como a soma dos comprimentos das strings, a comparação e as reduções analisam caracteres até o tamanho do menor candidato. O limite usual é O(S); nenhuma string é percorrida além de seu próprio tamanho por uma comparação bem-sucedida relevante.

## 12. Complexidade espacial

`prefix` referencia ou cria strings menores; fora as strings produzidas por `slice`, a estrutura de controle usa O(1). Considerando a cópia do prefixo no pior caso, o espaço adicional pode ser O(L), onde L é seu comprimento.

## 13. Casos extremos

Uma única string é seu próprio prefixo. Uma string vazia força resultado vazio. Prefixos completos e ausência total de coincidência são tratados pelo mesmo `while`.

## 14. Erros comuns

- Confundir prefixo com uma substring no meio.
- Parar após comparar somente duas strings.
- Não retornar `""` quando o candidato é reduzido a vazio.

## 15. Como reconhecer problemas semelhantes

Quando várias strings precisam compartilhar uma propriedade inicial, usar uma delas como candidato e estreitá-lo progressivamente é uma estratégia útil.

## 16. Perguntas de revisão

1. Por que a primeira string é um limite inicial válido?
2. Como prefixo difere de substring?
3. O que garante que um prefixo reduzido continua válido para strings anteriores?
4. Quando o algoritmo pode encerrar cedo?

## 17. Resumo do aprendizado

Reduzir um prefixo candidato preserva o maior começo comum conhecido e encontra a resposta sem estruturas auxiliares complexas.
