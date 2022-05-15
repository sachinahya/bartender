import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import {
  cloneElement,
  FC,
  HTMLAttributes,
  ImgHTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { Link } from '../link';
import { styles as linkOverlayStyles } from '../link-overlay';

import * as styles from './tile.css';

export interface TileProps extends HTMLAttributes<HTMLElement> {
  tileTitle: ReactNode;
  subtitle?: ReactNode;
  image: string | ReactElement<ImgHTMLAttributes<HTMLImageElement>>;
  imageAlt?: string;
  href: string;
  backgroundColor?: string;
}

export const Tile: FC<TileProps> = ({
  tileTitle,
  subtitle,
  image,
  imageAlt,
  href,
  backgroundColor,
  ...props
}) => {
  const imageElement = isValidElement(image) ? (
    cloneElement(image, {
      className: clsx(styles.img, image.props.className),
    })
  ) : (
    <img src={image} alt={imageAlt} className={styles.img} />
  );

  return (
    <article
      {...props}
      style={{
        ...assignInlineVars({
          [styles.backgroundColorVar]: backgroundColor || '',
        }),
        ...props.style,
      }}
      className={clsx(styles.root, linkOverlayStyles.linkBox, props.className)}
    >
      {imageElement}
      <div className={styles.content}>
        <Link to={href} className={styles.link}>
          {tileTitle}
        </Link>
        {subtitle && <div className={styles.category}>{subtitle}</div>}
      </div>
      <Link
        aria-hidden
        to={href}
        className={clsx(linkOverlayStyles.linkOverlay, styles.overlayLink)}
      >
        {tileTitle}
      </Link>
    </article>
  );
};
