import { describe, expect, it } from 'vitest';
import { catalog, categories } from './catalog';

describe('catalog integrity', () => {
  it('contains unique ids, examples and valid references', () => {
    expect(new Set(catalog.map((entry) => entry.id)).size).toBe(catalog.length);
    for (const entry of catalog) {
      expect(categories).toContain(entry.category);
      expect(entry.description).not.toHaveLength(0);
      expect(entry.examples.length).toBeGreaterThan(0);
      expect(entry.reference).toMatch(/^https:\/\//);
    }
  });
});
