import { FC, ReactNode } from 'react';
import { FaGlassMartini, FaSearch, FaHeart } from 'react-icons/fa';

import { BottomNavigation, BottomNavigationItem } from '../../components/bottom-navigation';

import * as styles from './layout.css';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export interface MainProps {
  children?: ReactNode;
}

export const Main: FC<MainProps> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
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
