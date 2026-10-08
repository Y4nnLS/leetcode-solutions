# 20 — Valid Parentheses

## 1. Informações gerais

- Dificuldade: Easy; categoria: Stack.
- Link: <https://leetcode.com/problems/valid-parentheses/>.
- Conceitos: pilha, LIFO e correspondência de delimitadores.

## 2. Entendendo o problema

Uma sequência é válida quando todo fechamento corresponde ao último símbolo de abertura ainda sem par e nada sobra aberto ao final. A ordem importa: `([)]` possui os pares certos em quantidade, mas na ordem errada.

## 3. Exemplos de entrada e saída

`"()[]{}"` é válida. `"(]"` falha porque `]` não fecha `(`. `"{[]"` falha porque há uma abertura pendente.

## 4. Conhecimentos necessários

Uma Stack segue LIFO (*last in, first out*): o último item inserido é o primeiro removido. Um array com `push` e `pop` representa bem a pilha. O objeto `openingForClosing` informa qual abertura cada fechamento espera.

## 5. Raciocínio inicial

Precisamos lembrar aberturas que ainda aguardam fechamento. Contadores não bastam, porque não registram a ordem nem o tipo. Uma pilha guarda exatamente a abertura mais recente que deve ser fechada.

## 6. Abordagem ingênua

Remover repetidamente pares de uma string até não haver mais pares pode funcionar, porém cria muitas strings e repete trabalho. Uma passada com pilha é direta.

## 7. Abordagem escolhida

Para abertura, fazemos `push`. Para fechamento, removemos o topo e comparamos com a abertura esperada. Se forem diferentes — inclusive se a pilha estiver vazia — retornamos `false`. Depois da passada, a pilha precisa estar vazia.

## 8. Passo a passo da execução

Para `"{[]}"`:

| Caractere | Pilha antes | Ação | Pilha depois |
| --- | --- | --- | --- |
| `{` | `[]` | empilha | `[{]` |
| `[` | `[{]` | empilha | `[{, []` |
| `]` | `[{, []` | remove `[` e confere | `[{]` |
| `}` | `[{]` | remove `{` e confere | `[]` |

## 9. Análise do código

`character in openingForClosing` identifica fechamentos. `stack.pop()` é comparado à abertura exigida. O retorno final `stack.length === 0` detecta caracteres pendentes.

## 10. Por que a solução funciona?

A pilha contém, em ordem, exatamente as aberturas não fechadas. O próximo fechamento válido obrigatoriamente deve combinar com o topo, a abertura mais recente. Uma falha nessa condição não pode ser reparada por caracteres futuros; pilha vazia ao final significa que todos os pares foram fechados corretamente.

## 11. Complexidade temporal

Cada um dos `n` caracteres é empilhado ou removido uma vez, e cada operação é O(1). O tempo total é O(n).

## 12. Complexidade espacial

No pior caso, todos os caracteres são aberturas e ficam na pilha: O(n) de espaço auxiliar.

## 13. Casos extremos

Um fechamento inicial falha porque `pop` devolve `undefined`. Sequências incompletas deixam itens na pilha. Pares aninhados e adjacentes funcionam porque LIFO preserva a ordem necessária.

## 14. Erros comuns

- Contar apenas quantidades de parênteses.
- Aceitar qualquer abertura ao encontrar um fechamento.
- Retornar `true` sem verificar se a pilha ficou vazia.

## 15. Como reconhecer problemas semelhantes

Use uma pilha quando a última pendência aberta deve ser resolvida primeiro: delimitadores, desfazer ações, avaliação de expressões e percursos aninhados.

## 16. Perguntas de revisão

1. O que LIFO significa neste problema?
2. Por que `([)]` é inválida?
3. O que um `pop` de pilha vazia indica?
4. Por que a pilha final deve estar vazia?

## 17. Resumo do aprendizado

A Stack transforma a regra de aninhamento em uma verificação linear: guardar aberturas e conferir cada fechamento com o topo.
