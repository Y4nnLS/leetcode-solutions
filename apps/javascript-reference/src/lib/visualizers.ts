import type { VisualizationStep, VisualizerKind } from '../types/catalog';

const metrics = (reads = 0, writes = 0, comparisons = 0, iterations = 0) => ({ reads, writes, comparisons, iterations });
const step = (id: string, description: string, state: string[], highlightedIndices: number[] = [], activeOperation?: string, counts = metrics()): VisualizationStep => ({ id, description, state, highlightedIndices, activeOperation, metrics: counts });

function parseNumbers(source: string) {
  const values = source.split(',').map((value) => value.trim()).filter(Boolean).map(Number);
  if (values.length === 0 || values.length > 20 || values.some((value) => !Number.isFinite(value))) {
    throw new Error('Use de 1 a 20 números separados por vírgula.');
  }
  return values;
}

export function defaultInput(kind: VisualizerKind) {
  switch (kind) {
    case 'string-slice': return 'JavaScript, 4, 10';
    case 'string-indexof': return 'aprenda JavaScript, Java';
    case 'binary-search': return '1, 3, 5, 7, 9, 11 | 7';
    case 'two-pointers': return '0, 1, 2, 2, 3, 0, 4, 2 | 2';
    default: return '2, 3, 4';
  }
}

export function createSteps(kind: VisualizerKind, source: string): VisualizationStep[] {
  if (kind === 'string-slice') {
    const [text = '', startRaw = '0', endRaw = String(text.length)] = source.split(',').map((part) => part.trim());
    const start = Number(startRaw); const end = Number(endRaw);
    if (!text || !Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || end > text.length) throw new Error('Informe texto, início e fim válidos: JavaScript, 4, 10.');
    const chars = [...text];
    return [step('start', 'String inicial; os índices finais não entram no recorte.', chars, []), step('select', `Seleciona os índices de ${start} até ${end - 1}.`, chars, Array.from({ length: end - start }, (_, index) => start + index), 'leitura', metrics(end - start, 0, 0, 1)), step('result', `Resultado: "${text.slice(start, end)}".`, [...text.slice(start, end)], [], 'resultado', metrics(end - start, 0, 0, 1))];
  }
  if (kind === 'string-indexof') {
    const [text = '', search = ''] = source.split(',').map((part) => part.trim());
    if (!text || !search) throw new Error('Informe texto e termo de busca separados por vírgula.');
    const found = text.indexOf(search);
    const checks = Math.max(1, found + 1);
    return [step('start', `Busca sequencial por "${search}" em "${text}".`, [...text]), step('scan', found >= 0 ? `A sequência foi encontrada a partir do índice ${found}.` : 'Nenhuma ocorrência foi encontrada.', [...text], found >= 0 ? Array.from({ length: search.length }, (_, index) => found + index) : [], 'comparação', metrics(checks * search.length, 0, checks, checks)), step('result', `indexOf retorna ${found}.`, [String(found)], [], 'resultado', metrics(checks * search.length, 0, checks, checks))];
  }
  if (kind === 'binary-search') {
    const [valuesRaw = '', targetRaw = ''] = source.split('|').map((part) => part.trim());
    const values = parseNumbers(valuesRaw); const target = Number(targetRaw);
    if (!Number.isFinite(target) || values.some((value, index) => index > 0 && value <= values[index - 1])) throw new Error('Use números estritamente crescentes e um alvo: 1, 3, 5 | 3.');
    const steps = [step('start', `Busca pelo valor ${target} em uma lista ordenada.`, values.map(String))];
    let left = 0; let right = values.length - 1; let comparisons = 0;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2); comparisons += 1;
      steps.push(step(`check-${mid}-${comparisons}`, `left=${left}, right=${right}, mid=${mid}. Compara ${values[mid]} com ${target}.`, values.map(String), [left, mid, right], 'comparação', metrics(1, 0, comparisons, comparisons)));
      if (values[mid] === target) { steps.push(step('found', `Encontrado no índice ${mid}.`, values.map(String), [mid], 'resultado', metrics(1, 0, comparisons, comparisons))); return steps; }
      if (values[mid] < target) left = mid + 1; else right = mid - 1;
    }
    steps.push(step('missing', 'O intervalo ficou vazio: o valor não está na lista.', values.map(String), [], 'resultado', metrics(0, 0, comparisons, comparisons)));
    return steps;
  }
  if (kind === 'two-pointers') {
    const [valuesRaw = '', targetRaw = ''] = source.split('|').map((part) => part.trim());
    const values = parseNumbers(valuesRaw); const target = Number(targetRaw);
    if (!Number.isFinite(target)) throw new Error('Informe o valor a remover após |.');
    const state = [...values]; const steps = [step('start', `Compacta itens diferentes de ${target}.`, state.map(String))]; let write = 0; let reads = 0; let writes = 0;
    values.forEach((value, read) => { reads += 1; if (value !== target) { state[write] = value; writes += 1; steps.push(step(`keep-${read}`, `Lê ${value} no índice ${read} e escreve no índice ${write}.`, state.map(String), [read, write], 'escrita', metrics(reads, writes, reads, read + 1))); write += 1; } else steps.push(step(`skip-${read}`, `Lê ${value} no índice ${read} e ignora o valor removido.`, state.map(String), [read], 'comparação', metrics(reads, writes, reads, read + 1))); });
    steps.push(step('result', `Prefixo válido: [${state.slice(0, write).join(', ')}]; tamanho ${write}.`, state.slice(0, write).map(String), [], 'resultado', metrics(reads, writes, reads, values.length))); return steps;
  }
  const values = parseNumbers(source); const state = [...values]; const steps = [step('start', 'Estado inicial.', state.map(String))];
  if (kind === 'array-push') { state.push(9); steps.push(step('push', 'Adiciona 9 no fim.', state.map(String), [state.length - 1], 'escrita', metrics(0, 1, 0, 1))); }
  if (kind === 'array-pop') { const index = state.length - 1; const value = state.pop(); steps.push(step('pop', `Remove e retorna ${value}.`, state.map(String), [index], 'remoção', metrics(1, 1, 0, 1))); }
  if (kind === 'array-unshift') { state.unshift(1); steps.push(step('shift', 'Desloca os elementos para abrir a primeira posição.', values.map(String), values.map((_, index) => index), 'movimentação', metrics(values.length, values.length, 0, 1))); steps.push(step('insert', 'Insere 1 no início.', state.map(String), [0], 'escrita', metrics(values.length, values.length + 1, 0, 2))); }
  if (kind === 'array-reverse') { for (let left = 0, right = state.length - 1; left < right; left += 1, right -= 1) { [state[left], state[right]] = [state[right], state[left]]; steps.push(step(`swap-${left}`, `Troca os índices ${left} e ${right}.`, state.map(String), [left, right], 'troca', metrics(2, 2, 0, left + 1))); } }
  if (kind === 'array-map') { const output: number[] = []; values.forEach((value, index) => { output.push(value * 2); steps.push(step(`map-${index}`, `${value} × 2 = ${value * 2}.`, output.map(String), [index], 'transformação', metrics(index + 1, index + 1, 0, index + 1))); }); }
  if (kind === 'array-filter') { const output: number[] = []; values.forEach((value, index) => { if (value % 2 === 0) output.push(value); steps.push(step(`filter-${index}`, `${value} é ${value % 2 === 0 ? 'par e entra' : 'ímpar e não entra'} no resultado.`, output.map(String), [index], 'comparação', metrics(index + 1, value % 2 === 0 ? output.length : output.length, index + 1, index + 1))); }); }
  if (kind === 'array-reduce') { let total = 0; values.forEach((value, index) => { total += value; steps.push(step(`reduce-${index}`, `Acumulador: ${total - value} + ${value} = ${total}.`, [String(total)], [index], 'acumulação', metrics(index + 1, 1, 0, index + 1))); }); }
  if (steps.length === 1) throw new Error('Visualização não disponível para esta operação.');
  steps.push(step('result', 'Resultado final da simulação.', steps.at(-1)?.state ?? [], [], 'resultado', steps.at(-1)?.metrics));
  return steps;
}
