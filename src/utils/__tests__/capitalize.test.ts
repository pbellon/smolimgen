import { describe, expect, test } from 'vitest';

import { capitalize } from '../capitalize';

type Case = {
  value: string;
  result: string;
};

describe('capitalize', () => {
  const cases: Case[] = [
    { value: '', result: '' },
    { value: 'toTo', result: 'ToTo' }
  ];

  test.each(cases)('capitalize($value) -> $result', ({ value, result }) => {
    expect(capitalize(value)).toEqual(result);
  });
});
