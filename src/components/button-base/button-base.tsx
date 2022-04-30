import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import * as styles from './button-base.css';

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles.colourVariants;
  buttonSize?: keyof typeof styles.size;
  loading?: boolean;
}

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(function ButtonBase(
  { variant = 'primary', buttonSize = 'normal', loading, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      {...props}
      className={clsx(
        styles.reset,
        styles.colourVariants[variant],
        styles.size[buttonSize],
        props.className,
      )}
      disabled={loading || disabled}
    />
  );
});
