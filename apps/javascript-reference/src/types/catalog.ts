export type Category =
  | 'Arrays'
  | 'Strings'
  | 'Math e Numbers'
  | 'Map'
  | 'Set'
  | 'Objects'
  | 'Iteration'
  | 'Techniques';

export type Purpose =
  | 'Inserção'
  | 'Remoção'
  | 'Busca'
  | 'Ordenação'
  | 'Transformação'
  | 'Iteração'
  | 'Verificação'
  | 'Acumulação';

export type Complexity = {
  time: string;
  space: string;
  explanation: string;
};

export type Example = {
  title: string;
  code: string;
  result: string;
};

export type VisualizerKind =
  | 'array-unshift'
  | 'array-push'
  | 'array-pop'
  | 'array-reverse'
  | 'array-map'
  | 'array-filter'
  | 'array-reduce'
  | 'string-slice'
  | 'string-indexof'
  | 'binary-search'
  | 'two-pointers';

export type CatalogEntry = {
  id: string;
  name: string;
  category: Category;
  group: string;
  kind: 'method' | 'technique';
  signature: string;
  description: string;
  parameters: string[];
  returnType: string;
  mutatesOriginal: boolean | null;
  purposes: Purpose[];
  keywords: string[];
  complexity: Complexity;
  useCases: string[];
  cautions: string[];
  related: string[];
  reference: string;
  examples: Example[];
  visualizer?: VisualizerKind;
};

export type VisualizationStep = {
  id: string;
  description: string;
  state: string[];
  highlightedIndices?: number[];
  activeOperation?: string;
  metrics: { reads: number; writes: number; comparisons: number; iterations: number };
};
