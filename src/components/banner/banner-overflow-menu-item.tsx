import { FC } from 'react';

import { MenuItem, MenuItemProps } from '../menu';

export interface BannerOverflowMenuItemProps extends MenuItemProps {}

export const BannerOverflowMenuItem: FC<BannerOverflowMenuItemProps> = (props) => {
  return <MenuItem {...props} />;
};
