import { FC } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

import { Menu, MenuProps } from '../menu';

export interface BannerOverflowMenuProps extends MenuProps {}

export const BannerOverflowMenu: FC<BannerOverflowMenuProps> = ({ children, ...props }) => {
  return (
    <Menu
      button={{
        children: <FaEllipsisV />,
        'aria-label': 'More',
        variant: 'minimal',
      }}
      {...props}
    >
      {children}
    </Menu>
  );
};
