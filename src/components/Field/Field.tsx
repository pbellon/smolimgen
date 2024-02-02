import { CSSProperties, FC, PropsWithChildren, ReactNode } from 'react';

import styles from './Field.module.scss';

type FieldProps = {
  style?: CSSProperties;
  label: ReactNode;
  htmlFor?: string;
};

export const Field: FC<PropsWithChildren<FieldProps>> = ({
  style,
  children,
  htmlFor,
  label
}) => (
  <div className={styles.field} style={style}>
    <label htmlFor={htmlFor}>{label}</label>
    {children}
  </div>
);
