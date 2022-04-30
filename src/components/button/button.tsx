import clsx from 'clsx';
import { cloneElement, forwardRef, ReactElement, ReactNode, SVGAttributes } from 'react';

import { ButtonBase, ButtonBaseProps } from '../button-base';
import { Progress } from '../progress';

import * as styles from './button.css';

export interface ButtonProps extends ButtonBaseProps {
  icon?: ReactElement<SVGAttributes<SVGElement>>;
  loadingContent?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant, buttonSize, loading, icon, loadingContent = children, disabled, ...props },
  ref,
) {
  const iconElement = icon
    ? cloneElement(icon, { className: clsx(styles.icon, icon.props.className) })
    : undefined;

  return (
    <ButtonBase
      {...props}
      ref={ref}
      className={clsx(styles.button, props.className)}
      loading={loading}
      variant={variant}
      buttonSize={buttonSize}
    >
      <span className={clsx(!iconElement && styles.progressOverlay)}>
        {loading ? <Progress /> : iconElement}
      </span>
      <span className={clsx(styles.inner, loading && !iconElement && styles.textProgressNoIcon)}>
        {loading ? loadingContent : children}
      </span>
    </ButtonBase>
  );
});
