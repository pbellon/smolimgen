import { describe, expect, test } from 'vitest';

import { swap } from '@utils/swap';

describe('swap', () => {
  const cases = [
    {
      input: [0, 1, 2, 3, 4, 5],
      output: [2, 1, 0, 3, 4, 5],
      a: 0,
      b: 2
    },
    {
      input: [0, 1, 2, 3, 4, 5],
      output: [2, 1, 0, 3, 4, 5],
      a: 2,
      b: 0
    },
    {
      input: [0, 1, 2, 3, 4, 5],
      output: [0, 1, 2, 3, 4, 5],
      a: 2,
      b: 2
    }
  ];
  test.each(cases)(
    'swap($input, $a, $b) -> $outout',
    ({ input, output, a, b }) => {
      expect(swap(input, a, b)).toEqual(output);
    }
  );
});
