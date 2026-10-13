import { describe, expect, it } from 'vitest';
import { createSteps } from './visualizers';

describe('visualizers', () => {
  it('produces deterministic unshift steps', () => {
    const first = createSteps('array-unshift', '2, 3, 4');
    const second = createSteps('array-unshift', '2, 3, 4');
    expect(first).toEqual(second);
    expect(first.at(-1)?.state).toEqual(['1', '2', '3', '4']);
  });

  it('models binary search decisions', () => {
    const steps = createSteps('binary-search', '1, 3, 5, 7, 9 | 7');
    expect(steps.at(-1)?.description).toContain('índice 3');
  });

  it('rejects unsafe visualizer input', () => {
    expect(() => createSteps('array-push', '1, nope')).toThrow('Use de 1 a 20 números');
  });
});
