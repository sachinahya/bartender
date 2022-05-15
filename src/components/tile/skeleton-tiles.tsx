import { FC } from 'react';
import type { Except } from 'type-fest';

import { Skeleton } from '../skeleton';

import * as styles from './tile.css';
import { Tiles, TilesProps } from './tiles';

export interface SkeletonTilesProps extends Except<TilesProps, 'children'> {
  count?: number;
}

export const SkeletonTiles: FC<SkeletonTilesProps> = ({ count = 0, ...props }) => {
  return (
    <Tiles {...props}>
      {count > 0
        ? Array.from({ length: count }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key -- We only have index.
            <Skeleton key={i} className={styles.skeleton} />
          ))
        : undefined}
    </Tiles>
  );
};
