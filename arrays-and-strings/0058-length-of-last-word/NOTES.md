# 58 — Length of Last Word

## Informações gerais

- Dificuldade: Easy; categoria: Arrays and Strings.
- Link: <https://leetcode.com/problems/length-of-last-word/>.
- Conceitos: strings, espaços em branco e varredura reversa.

## Entendendo o problema

Devemos retornar o tamanho da última palavra de `s`. Uma palavra é uma sequência de caracteres que não são espaços. Os espaços antes ou depois das palavras não fazem parte de nenhuma palavra e devem ser ignorados.

## Abordagem escolhida

Primeiro, `trim()` remove os espaços nas extremidades. Depois, `lastIndexOf(' ')` localiza o último espaço interno. A diferença entre o tamanho da string e essa posição fornece o tamanho da palavra final; quando não há espaço, `lastIndexOf` retorna `-1`, o que faz a fórmula retornar o tamanho da única palavra.

Para `"   fly me   to   the moon  "`, a string tratada é `"fly me   to   the moon"`. O último espaço está imediatamente antes de `moon`, portanto o resultado é `4`.

## Por que funciona?

Após remover os espaços finais, o último caractere pertence necessariamente à última palavra. Se houver um espaço antes dela, ele separa essa palavra de todo o texto anterior; se não houver, a string inteira é uma única palavra. Em ambos os casos, `s.length - s.lastIndexOf(' ') - 1` conta exatamente os caracteres depois do último separador.

## Complexidade

- Tempo: O(n), pois `trim()` e a busca pelo último espaço percorrem no máximo a string.
- Espaço auxiliar: O(n) no pior caso, porque `trim()` pode produzir uma nova string proporcional ao tamanho da entrada.

## Casos extremos

- Uma única palavra não possui espaço interno e retorna seu próprio tamanho.
- Espaços no início, no fim ou entre palavras são ignorados conforme necessário.
- Uma palavra final de um caractere retorna `1`.

## Testes

Os casos cobrem uma frase simples, espaços repetidos, espaços nas extremidades, uma palavra única e palavra final de um caractere.

Status: 7 testes ativos aprovados com `npm run test:exercise -- 58`.

## Resumo do aprendizado

Normalizar espaços nas extremidades reduz o problema a encontrar o último separador interno da string.
