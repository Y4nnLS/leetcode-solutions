# 13 — Roman to Integer

## 1. Informações gerais

- Dificuldade: Easy; categoria: Math.
- Link: <https://leetcode.com/problems/roman-to-integer/>.
- Conceitos: tabela de consulta, iteração e pares subtrativos.

## 2. Entendendo o problema

Devemos converter um numeral romano válido em inteiro. Os símbolos são `I=1`, `V=5`, `X=10`, `L=50`, `C=100`, `D=500` e `M=1000`. Geralmente somamos símbolos; quando um menor vem antes de um maior, seu valor é subtraído.

## 3. Exemplos de entrada e saída

`LVIII` vale 58 por soma. `IV` vale 4 porque I antecede V. `MCMXCIV` vale 1994 e tem três situações subtrativas.

## 4. Conhecimentos necessários

Um objeto mapeia símbolo para valor. Ao comparar o valor atual com o próximo, sabemos se o atual contribui positivamente ou negativamente; isso reconhece pares como IV, IX, XL, XC, CD e CM.

## 5. Raciocínio inicial

Poderíamos tratar cada par subtrativo de forma separada, mas a regra “menor antes de maior subtrai” generaliza todos os pares válidos e simplifica o percurso.

## 6. Abordagem ingênua

Substituir textos ou testar muitos pares especiais pode funcionar, porém espalha regras e torna mais fácil omitir uma combinação. Uma única comparação por símbolo é mais direta.

## 7. Abordagem escolhida

Para cada símbolo, lemos seu valor e o do próximo. Se o atual for menor, subtraímos; caso contrário, somamos. O último símbolo não possui próximo e, portanto, sempre é somado.

## 8. Passo a passo da execução

Para `MCMXCIV`:

| Símbolo | Próximo | Operação | Total |
| --- | --- | --- | ---: |
| M | C | +1000 | 1000 |
| C | M | -100 | 900 |
| M | X | +1000 | 1900 |
| X | C | -10 | 1890 |
| C | I | +100 | 1990 |
| I | V | -1 | 1989 |
| V | — | +5 | 1994 |

## 9. Análise do código

`values` concentra a tabela. O laço recupera `current` e `next`; o operador ternário escolhe sinal. O acumulador `total` recebe uma contribuição por posição.

## 10. Por que a solução funciona?

Em uma escrita romana válida, um símbolo menor imediatamente antes de maior pertence a uma composição subtrativa; em qualquer outro caso, deve ser somado. Cada símbolo é contabilizado uma vez com o sinal correto, então a soma é o valor do numeral.

## 11. Complexidade temporal

Uma string de comprimento `n` é percorrida uma vez. Consultas ao objeto são O(1), resultando em O(n) de tempo.

## 12. Complexidade espacial

A tabela tem sete entradas fixas e o restante são escalares: O(1) de espaço auxiliar.

## 13. Casos extremos

Um único símbolo é somado. Numerais puramente aditivos e numerais com vários pares subtrativos usam a mesma regra. As entradas são numerais romanos válidos segundo o contrato.

## 14. Erros comuns

- Somar tudo e ignorar subtrações.
- Subtrair sem olhar apenas o próximo símbolo.
- Esquecer de contabilizar o último caractere.

## 15. Como reconhecer problemas semelhantes

Sequências em que o significado de um item depende do vizinho seguinte costumam ser resolvidas com uma passada e comparação local.

## 16. Perguntas de revisão

1. Quando o valor atual é subtraído?
2. Por que o último símbolo é sempre somado?
3. Quais símbolos formam o par CM?
4. Por que não é necessário listar cada par no código?

## 17. Resumo do aprendizado

Uma tabela de símbolos e a comparação com o próximo caractere convertem numerais romanos de forma linear, tratando soma e subtração pela mesma regra.
