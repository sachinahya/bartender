import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import { defineVar } from '../../utils/styles';

import * as styles from './background-container.css';

export interface BackgroundContainerProps extends HTMLAttributes<HTMLElement> {
  image?: string;
  imageMaxSize?: string | number;
}

export const BackgroundContainer: FC<BackgroundContainerProps> = ({
  children,
  image,
  imageMaxSize,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(styles.root, props.className)}
      style={{
        [defineVar(styles.backgroundImageVar)]: image ? `url(${image})` : undefined,
        [defineVar(styles.backgroundMaxHeightVar)]:
          typeof imageMaxSize === 'number' ? `${imageMaxSize}px` : imageMaxSize,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};
