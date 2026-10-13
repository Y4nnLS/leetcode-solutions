import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createSteps, defaultInput } from '../lib/visualizers';
import type { VisualizerKind } from '../types/catalog';

export function Visualizer({ kind }: { kind: VisualizerKind }) {
  const [input, setInput] = useState(() => defaultInput(kind));
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const result = useMemo(() => { try { return { steps: createSteps(kind, input), error: '' }; } catch (error) { return { steps: [], error: error instanceof Error ? error.message : 'Entrada inválida.' }; } }, [kind, input]);
  const current = result.steps[stepIndex] ?? result.steps[0];

  useEffect(() => {
    if (!playing || !result.steps.length) return undefined;
    const id = window.setInterval(() => setStepIndex((currentIndex) => currentIndex >= result.steps.length - 1 ? (setPlaying(false), currentIndex) : currentIndex + 1), 900 / speed);
    return () => window.clearInterval(id);
  }, [playing, result.steps.length, speed]);

  return <section className="surface mt-8 p-5" aria-labelledby="visualizer-title">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 id="visualizer-title" className="text-lg font-semibold">Visualizador passo a passo</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Simulação didática determinística; não representa detalhes internos do motor JavaScript.</p></div><span className="tag">Passo {result.steps.length ? stepIndex + 1 : 0}/{result.steps.length}</span></div>
    <label className="mt-5 block text-sm font-medium">Entrada controlada<textarea value={input} onChange={(event) => { setInput(event.target.value); setStepIndex(0); setPlaying(false); }} className="mt-2 min-h-20 w-full rounded-lg border border-slate-300 bg-transparent p-3 font-mono text-sm dark:border-slate-700" aria-describedby="visualizer-help" /></label>
    <p id="visualizer-help" className="mt-1 text-xs text-slate-500">Use no máximo 20 números quando a visualização aceitar arrays.</p>
    {result.error ? <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/40 dark:text-rose-200" role="alert">{result.error}</p> : current && <>
      <div className="mt-5 min-h-32 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"><div className="flex min-w-max items-end gap-2">{current.state.map((value, index) => <div key={`${value}-${index}`} className="flex flex-col items-center gap-1"><span className="text-xs text-slate-500">{index}</span><span className={`grid h-12 min-w-12 place-items-center rounded-lg border px-3 font-mono transition ${current.highlightedIndices?.includes(index) ? 'border-sky-500 bg-sky-100 text-sky-950 dark:bg-sky-900 dark:text-sky-50' : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900'}`}>{value}</span></div>)}</div></div>
      <p className="mt-4 text-sm leading-6" aria-live="polite">{current.description}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4"><Metric label="Leituras" value={current.metrics.reads} /><Metric label="Escritas" value={current.metrics.writes} /><Metric label="Comparações" value={current.metrics.comparisons} /><Metric label="Iterações" value={current.metrics.iterations} /></dl>
      <div className="mt-5 flex flex-wrap items-center gap-2"><button className="button border border-slate-300 dark:border-slate-700" onClick={() => setStepIndex(0)} aria-label="Reiniciar visualização"><RotateCcw size={16} /> Reiniciar</button><button className="button border border-slate-300 dark:border-slate-700" onClick={() => setStepIndex((index) => Math.max(0, index - 1))} disabled={stepIndex === 0}><SkipBack size={16} /> Anterior</button><button className="button button-primary" onClick={() => setPlaying((value) => !value)} disabled={stepIndex === result.steps.length - 1 && !playing}>{playing ? <><Pause size={16} /> Pausar</> : <><Play size={16} /> Iniciar</>}</button><button className="button border border-slate-300 dark:border-slate-700" onClick={() => setStepIndex((index) => Math.min(result.steps.length - 1, index + 1))} disabled={stepIndex === result.steps.length - 1}>Próximo <SkipForward size={16} /></button><label className="ml-auto flex items-center gap-2 text-sm">Velocidade<select className="rounded border border-slate-300 bg-transparent p-2 dark:border-slate-700" value={speed} onChange={(event) => setSpeed(Number(event.target.value))}><option value={0.5}>0,5×</option><option value={1}>1×</option><option value={1.5}>1,5×</option><option value={2}>2×</option></select></label></div>
    </>}
  </section>;
}
function Metric({ label, value }: { label: string; value: number }) { return <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800"><dt className="text-slate-500">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>; }
