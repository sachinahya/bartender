import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, ReactElement, ReactNode } from 'react';
import { Button as ReakitButton } from 'reakit';

import { Progress } from '../progress';

import * as styles from './button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof styles.button;
  buttonSize?: keyof typeof styles.size;
  icon?: ReactElement;
  loading?: boolean;
  loadingContent?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    buttonSize = 'normal',
    icon,
    loading,
    loadingContent = children,
    disabled,
    ...props
  },
  ref,
) {
  const isDisabled = loading || disabled;

  return (
    <ReakitButton
      ref={ref}
      {...props}
      className={clsx(styles.button[variant], styles.size[buttonSize], props.className)}
      disabled={isDisabled}
    >
      <span className={clsx(!icon && styles.progressOverlay)}>{loading ? <Progress /> : icon}</span>
      <span className={clsx(styles.inner, loading && !icon && styles.textProgressNoIcon)}>
        {loading ? loadingContent : children}
      </span>
    </ReakitButton>
  );
});
