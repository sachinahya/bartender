import { FC } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

import { BannerAction, BannerActionProps } from './banner-action';

export interface BannerBackActionProps extends Partial<BannerActionProps> {
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
