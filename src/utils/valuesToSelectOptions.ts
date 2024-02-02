import { SelectOption, SelectOptionValue } from '@components/Select';

import { isString } from './isString';

export const valueToSelectOption = <TValue extends SelectOptionValue>(
  value: TValue
): SelectOption<TValue> => ({
  value,
  text: isString(value) ? value : value.toString()
});

export const valuesToSelectOptions = <TValue extends SelectOptionValue>(
  values: TValue[]
): SelectOption<TValue>[] => values.map(valueToSelectOption);
