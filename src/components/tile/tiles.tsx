import clsx from 'clsx';
import { Children, FC, ReactElement, HTMLAttributes, LiHTMLAttributes } from 'react';

import { TileProps } from './tile';
import * as styles from './tiles.css';

export interface TilesProps extends HTMLAttributes<HTMLElement> {
  children: ReactElement<TileProps> | ReactElement<TileProps>[];
  variant: styles.Variant;
  ulProps?: HTMLAttributes<HTMLUListElement>;
  liProps?: LiHTMLAttributes<HTMLLIElement>;
}

export const Tiles: FC<TilesProps> = ({ children, variant, ulProps, liProps, ...props }) => {
  return (
    <div {...props} className={clsx(styles.root[variant], props.className)}>
      <ul {...ulProps} className={clsx(styles.list[variant], ulProps?.className)}>
        {Children.map(children, (child) => (
          <li {...liProps} className={clsx(styles.item[variant], liProps?.className)}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};
