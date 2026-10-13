import { describe, expect, it } from 'vitest';
import { catalog } from '../data/catalog';
import { searchCatalog } from './search';

describe('searchCatalog', () => {
  it('finds a method by a Portuguese purpose synonym', () => {
    expect(searchCatalog(catalog, 'adicionar no começo').map((entry) => entry.id)).toContain('array-unshift');
  });

  it('normalizes accents and case', () => {
    expect(searchCatalog(catalog, 'ARREDONDAR PARA BAIXO').map((entry) => entry.id)).toContain('math-floor');
  });

  it('finds Set when avoiding duplicates', () => {
    expect(searchCatalog(catalog, 'evitar duplicados').some((entry) => entry.category === 'Set')).toBe(true);
  });

  it('returns no entries for a term that does not exist', () => {
    expect(searchCatalog(catalog, 'nuvem aleatória inexistente')).toEqual([]);
  });
});
