import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CatalogEntry } from '../types/catalog';

type Props = { entry: CatalogEntry; favorite: boolean; onToggleFavorite: (id: string) => void };

export function MethodCard({ entry, favorite, onToggleFavorite }: Props) {
  return (
    <article className="surface flex h-full flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <div><span className="tag">{entry.category}</span><h2 className="mt-3 text-lg font-semibold">{entry.name}</h2></div>
        <button className="button h-10 w-10 px-0" aria-label={favorite ? `Remover ${entry.name} dos favoritos` : `Favoritar ${entry.name}`} onClick={() => onToggleFavorite(entry.id)}>
          <Star size={18} className={favorite ? 'fill-amber-400 text-amber-500' : ''} />
        </button>
      </div>
      <code className="mt-3 text-sm text-sky-700 dark:text-sky-300">{entry.signature}</code>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{entry.description}</p>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs dark:border-slate-800"><span>{entry.complexity.time}</span><Link className="button text-sky-700 dark:text-sky-300" to={`/method/${entry.id}`}>Estudar <ArrowRight size={16} /></Link></div>
    </article>
  );
}
