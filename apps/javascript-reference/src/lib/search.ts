import type { CatalogEntry } from '../types/catalog';

export function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

export function rankEntry(entry: CatalogEntry, query: string) {
  const needle = normalize(query);
  if (!needle) return 1;
  const name = normalize(entry.name);
  const signature = normalize(entry.signature);
  const category = normalize(entry.category);
  const words = [entry.description, entry.group, ...entry.keywords, ...entry.purposes].map(normalize);

  if (name === needle || signature === needle) return 100;
  if (name.startsWith(needle)) return 80;
  if (signature.includes(needle)) return 70;
  if (words.some((word) => word === needle)) return 60;
  if (category.includes(needle) || words.some((word) => word.includes(needle))) return 40;
  return 0;
}

export function searchCatalog(entries: CatalogEntry[], query: string) {
  return entries
    .map((entry) => ({ entry, score: rankEntry(entry, query) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.entry.name.localeCompare(right.entry.name, 'pt-BR'))
    .map(({ entry }) => entry);
}
