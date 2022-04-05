import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import { bannerClear } from './banner.css';

export interface BannerClearProps extends HTMLAttributes<HTMLElement> {}

export const BannerClear: FC<BannerClearProps> = (props) => {
  return <div role="presentation" {...props} className={clsx(bannerClear, props.className)} />;
};
