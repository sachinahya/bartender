import { Children, FC, ReactElement, HTMLAttributes, LiHTMLAttributes } from 'react';

import { TileProps } from './tile';
import * as styles from './tile-grid.css';

export interface TileGridProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactElement<TileProps> | ReactElement<TileProps>[];
  liProps?: LiHTMLAttributes<HTMLLIElement>;
}

export const TileGrid: FC<TileGridProps> = ({ children, liProps, ...props }) => {
  return (
    <ul className={styles.root} {...props}>
      {Children.map(children, (child) => (
        <li {...liProps}>{child}</li>
      ))}
    </ul>
  );
};
