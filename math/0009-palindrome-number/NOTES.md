# 9 — Palindrome Number

## 1. Informações gerais

- Dificuldade: Easy; categoria: Math.
- Link: <https://leetcode.com/problems/palindrome-number/>.
- Conceitos: dígitos, divisão inteira e comparação de metades.

## 2. Entendendo o problema

Um número palíndromo é lido igual da esquerda para a direita e no sentido contrário. Devemos devolver `true` ou `false` sem converter o número para string. Números negativos não são palíndromos: o sinal `-` só aparece de um lado.

## 3. Exemplos de entrada e saída

`1221` é palíndromo; `-121` não é. `10` também não é, pois sua leitura inversa teria zero à esquerda. `0` é palíndromo.

## 4. Conhecimentos necessários

`x % 10` obtém o último dígito e `Math.floor(x / 10)` o remove. Ao construir `reversedHalf`, movemos dígitos da direita para a esquerda sem inverter todos eles.

## 5. Raciocínio inicial

Poderíamos inverter o número inteiro e comparar, mas isso faz trabalho desnecessário e pode ser menos seguro em linguagens com inteiros limitados. Basta comparar as duas metades.

## 6. Abordagem ingênua

Converter para texto e comparar a string com sua reversão é simples, mas usa memória proporcional ao número de dígitos e não segue a restrição usual de evitar conversão para string.

## 7. Abordagem escolhida

Rejeitamos negativos e números positivos terminados em zero. Depois removemos o último dígito de `x` e o acrescentamos a `reversedHalf` até esta metade ficar igual ou maior. Para quantidade ímpar de dígitos, o dígito central é descartado de `reversedHalf` com divisão por 10.

## 8. Passo a passo da execução

Para `x = 1221`:

| Etapa | x após remover último | reversedHalf |
| --- | ---: | ---: |
| início | 1221 | 0 |
| 1 | 122 | 1 |
| 2 | 12 | 12 |

Agora as metades são iguais. Em `121`, o fim seria `x = 1` e `reversedHalf = 12`; removendo o centro, `12 / 10` inteiro é 1.

## 9. Análise do código

A condição inicial cobre sinais e zero final. O `while (x > reversedHalf)` para ao alcançar metade dos dígitos. O retorno aceita igualdade direta (tamanho par) ou igualdade após remover o centro (tamanho ímpar).

## 10. Por que a solução funciona?

Cada iteração transfere exatamente o próximo dígito da extremidade direita para a metade invertida. Quando o laço para, cada extremidade já foi comparada implicitamente. A igualdade das metades equivale à igualdade de todos os pares simétricos.

## 11. Complexidade temporal

Se `d` é o número de dígitos, o laço roda cerca de `d / 2` vezes. Logo, o tempo é O(d), sem percorrer dígitos além do necessário.

## 12. Complexidade espacial

São usadas apenas as variáveis numéricas `x` e `reversedHalf`; o espaço auxiliar é O(1).

## 13. Casos extremos

Zero passa. Negativos falham imediatamente. Números positivos terminados em zero falham, exceto o próprio zero. Comprimentos pares e ímpares são tratados pelos dois lados do `||` final.

## 14. Erros comuns

- Considerar `-121` como palíndromo.
- Rejeitar `0` junto com outros valores terminados em zero.
- Esquecer de remover o dígito central em números de tamanho ímpar.

## 15. Como reconhecer problemas semelhantes

Problemas que pedem simetria de dígitos frequentemente permitem comparar extremidades ou metades, evitando uma cópia completa da representação.

## 16. Perguntas de revisão

1. Por que 10 não pode ser palíndromo?
2. O que o operador `% 10` extrai?
3. Por que o laço processa somente metade dos dígitos?
4. Como o código trata um dígito central?

## 17. Resumo do aprendizado

Comparar a metade invertida com a metade restante resolve o problema em tempo linear no número de dígitos e espaço constante.
