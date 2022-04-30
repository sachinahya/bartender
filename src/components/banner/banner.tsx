import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import * as styles from './banner.css';

export interface BannerProps extends HTMLAttributes<HTMLElement> {
  variant?: keyof typeof styles.banner;
}

export const Banner: FC<BannerProps> = ({ variant = 'heavy', ...props }) => {
  return (
    <header role="banner" {...props} className={clsx(styles.banner[variant], props.className)} />
  );
};
