import { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './Field.module.scss';

type FieldProps = {
  label: ReactNode;
  htmlFor?: string;
};

export const Field: FC<PropsWithChildren<FieldProps>> = ({
  children,
  htmlFor,
  label
}) => (
  <div className={styles.field}>
    <label htmlFor={htmlFor}>{label}</label>
    {children}
  </div>
);
