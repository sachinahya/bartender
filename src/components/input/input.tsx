import clsx from 'clsx';
import { FC, InputHTMLAttributes } from 'react';

import * as styles from './input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof styles.input;
  inputSize?: keyof typeof styles.size;
}

export const Input: FC<InputProps> = ({ variant = 'primary', inputSize = 'normal', ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        styles.input[variant],
        styles.lineHeightReset,
        styles.size[inputSize],
        props.className,
      )}
    />
  );
};
