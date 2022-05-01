import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import { Drink } from '../../entities';
import { Link } from '../link';
import { styles as linkOverlayStyles } from '../link-overlay';

import * as styles from './tile.css';

export interface TileProps extends HTMLAttributes<HTMLElement> {
  drink: Drink;
}

export const Tile: FC<TileProps> = ({ drink, ...props }) => {
  return (
    <article {...props} className={clsx(styles.root, linkOverlayStyles.linkBox, props.className)}>
      <img src={drink.image} alt={drink.name} className={styles.img} />
      <div className={styles.content}>
        <Link to={`/drink/${drink.id}`} className={styles.link}>
          {drink.name}
        </Link>
        <div className={styles.category}>{drink.category}</div>
      </div>
      <Link
        aria-hidden
        to={`/drink/${drink.id}`}
        className={clsx(linkOverlayStyles.linkOverlay, styles.overlayLink)}
      >
        {drink.name}
      </Link>
    </article>
  );
};
