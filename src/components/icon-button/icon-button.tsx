import clsx from 'clsx';
import { cloneElement, forwardRef, ReactElement, SVGAttributes } from 'react';

import { ButtonBase, ButtonBaseProps } from '../button-base';

import * as styles from './icon-button.css';

export interface IconButtonProps extends ButtonBaseProps {
  children: ReactElement<SVGAttributes<SVGElement>>;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { children, ...props },
  ref,
) {
  return (
    <ButtonBase ref={ref} {...props} className={clsx(styles.iconButton, props.className)}>
      {cloneElement(children, {
        className: clsx(styles.icon, children.props.className),
      })}
    </ButtonBase>
  );
});
