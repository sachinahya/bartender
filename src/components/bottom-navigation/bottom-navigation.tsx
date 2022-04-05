import clsx from 'clsx';
import { cloneElement, FC, HTMLAttributes, ReactElement, ReactNode } from 'react';

import { Link } from '../link';

import * as styles from './bottom-navigation.css';

export interface BottomNavigationItemProps {
  to: string;
  icon: ReactElement<HTMLAttributes<HTMLElement>>;
  text: ReactNode;
}

export const BottomNavigationItem: FC<BottomNavigationItemProps> = ({ to, icon, text }) => {
  return (
    <li className={styles.navListItem}>
      <Link
        to={to}
        className={styles.navListItemLink}
        activeClassName={styles.navListItemLinkActive}
      >
        {cloneElement(icon, {
          className: clsx(styles.navListItemLinkIcon, icon.props.className),
        })}
        {text}
      </Link>
    </li>
  );
};

export const BottomNavigation: FC = ({ children }) => {
  return (
    <>
      <div role="presentation" className={styles.footerClear} />
      <nav aria-label="Main" className={styles.footer}>
        <ul className={styles.navList}>{children}</ul>
      </nav>
    </>
  );
};
