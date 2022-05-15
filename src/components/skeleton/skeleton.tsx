import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import * as styles from './skeleton.css';

export interface SkeletonProps extends HTMLAttributes<HTMLElement> {}

// This is, well a skeleton component for now.
export const Skeleton: FC<SkeletonProps> = (props) => {
  return <div {...props} className={clsx(styles.root, props.className)} />;
};
