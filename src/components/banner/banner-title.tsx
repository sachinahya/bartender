import clsx from 'clsx';
import { FC } from 'react';
import type { Except } from 'type-fest';

import { Heading, HeadingProps } from '../heading';

import { bannerTitle } from './banner.css';

export interface BannerTitleProps extends Except<HeadingProps, 'level'> {}

export const BannerTitle: FC<BannerTitleProps> = (props) => {
  return (
    <Heading level="h1" variant="h2" {...props} className={clsx(bannerTitle, props.className)} />
  );
};
