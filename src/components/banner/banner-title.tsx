import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import { Heading } from '../heading';

import { bannerTitle } from './banner.css';

export interface BannerTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const BannerTitle: FC<BannerTitleProps> = (props) => {
  return (
    <Heading level="h1" variant="h2" {...props} className={clsx(bannerTitle, props.className)} />
  );
};
