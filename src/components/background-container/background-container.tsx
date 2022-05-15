import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import * as styles from './background-container.css';

export interface BackgroundContainerProps extends HTMLAttributes<HTMLElement> {
  image?: string;
  imageMaxSize?: string | number;
  forceMinSize?: boolean;
}

export const BackgroundContainer: FC<BackgroundContainerProps> = ({
  children,
  image,
  imageMaxSize,
  forceMinSize,
  ...props
}) => {
  const bgImage = image ? `url(${image})` : '';
  const imageHeight = typeof imageMaxSize === 'number' ? `${imageMaxSize}px` : imageMaxSize || '';

  return (
    <div
      {...props}
      className={clsx(styles.root, props.className)}
      style={{
        ...assignInlineVars({
          [styles.backgroundImageVar]: bgImage,
          [styles.backgroundMaxHeightVar]: imageHeight,
          [styles.containerMinHeightVar]: forceMinSize ? imageHeight : 'none',
        }),
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};
