import { FC } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import type { Except } from 'type-fest';

import { BannerAction, BannerActionProps } from './banner-action';

export interface BannerBackActionProps extends Except<BannerActionProps, 'aria-label'> {
  'aria-label'?: string;
}

export const BannerBackAction: FC<BannerBackActionProps> = (props) => {
  const handleClick = props.onClick;

  return (
    <BannerAction aria-label="Back" onClick={handleClick} {...props}>
      <FaChevronLeft />
    </BannerAction>
  );
};
