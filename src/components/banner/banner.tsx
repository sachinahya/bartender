import { FC, HTMLAttributes } from 'react';

import { banner } from './banner.css';

export interface BannerProps extends HTMLAttributes<HTMLElement> {}

export const BANNER_BLOCK_SIZE = [12, null, 16];

export const Banner: FC<BannerProps> = (props) => {
  return <header role="banner" className={banner} {...props} />;
};
