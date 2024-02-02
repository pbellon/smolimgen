import { CSSProperties, ChangeEventHandler } from 'react';

import styles from './Select.module.scss';

export type SelectOptionValue = string | number;

export type SelectOption<TValue extends SelectOptionValue> = {
  key?: string;
  value: TValue;
  text: string;
  style?: CSSProperties;
};

type SelectProps<TValue extends SelectOptionValue> = {
  className?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: SelectOption<TValue>[];
  value: TValue;
  name?: string;
  id?: string;
};

export const Select = <TValue extends SelectOptionValue>({
  className,
  id,
  value,
  onChange,
  options,
  name
}: SelectProps<TValue>): JSX.Element => (
  <div className={styles.wrapper}>
    <select
      className={className}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
    >
      {options.map(opt => (
        <option style={opt.style} key={opt.key ?? opt.value} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  </div>
);
