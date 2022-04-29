import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';
import { FaGlassMartini, FaSearch, FaHeart } from 'react-icons/fa';

import { BottomNavigation, BottomNavigationItem } from '../../components/bottom-navigation';

import * as styles from './layout.css';

export interface LayoutProps extends HTMLAttributes<HTMLElement> {}

export const Layout: FC<LayoutProps> = (props) => {
  return <div {...props} />;
};

export interface MainProps extends HTMLAttributes<HTMLElement> {}

export const Main: FC<MainProps> = (props) => {
  return <main {...props} className={clsx(styles.main, props.className)} />;
};

export const Footer: FC = () => {
  return (
    <BottomNavigation>
      <BottomNavigationItem to="/" icon={<FaSearch />} text="Discover" />
      <BottomNavigationItem to="/drink/random" icon={<FaGlassMartini />} text="Drink" />
      <BottomNavigationItem to="/favourites" icon={<FaHeart />} text="Favourites" />
    </BottomNavigation>
  );
};
