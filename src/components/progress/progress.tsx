import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import * as styles from './progress.css';

export interface ProgressProps extends HTMLAttributes<HTMLElement> {}

export const Progress: FC<ProgressProps> = (props) => {
  return <span className={clsx(styles.spinner, props.className)} />;
};
