import { FC } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

import { Menu, MenuProps, MenuButton } from '../menu';

import * as styles from './banner.css';

export interface BannerOverflowMenuProps extends Partial<MenuProps> {}

export const BannerOverflowMenu: FC<BannerOverflowMenuProps> = (props) => {
  return (
    <Menu
      aria-label="Overflow"
      button={
        <MenuButton aria-label="More" variant="minimal" className={styles.bannerAction}>
          <FaEllipsisV />
        </MenuButton>
      }
      {...props}
    />
  );
};
