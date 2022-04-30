import clsx from 'clsx';
import {
  Children,
  cloneElement,
  createContext,
  FC,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  useContext,
} from 'react';
import {
  Menu as ReakitMenu,
  MenuButton as ReakitMenuButton,
  MenuItem as ReakitMenuItem,
  MenuStateReturn as ReakitMenuStateReturn,
  useMenuState,
} from 'reakit';

import { IconButton, IconButtonProps } from '../icon-button';

import * as styles from './menu.css';

const MenuContext = createContext<ReakitMenuStateReturn | null>(null);

const useMenuContext = (): ReakitMenuStateReturn => {
  const menu = useContext(MenuContext);

  if (!menu) {
    throw new Error('No menu state.');
  }

  return menu;
};

export interface MenuButtonProps extends IconButtonProps {}

export const MenuButton: FC<MenuButtonProps> = (props) => {
  const menu = useMenuContext();

  return <ReakitMenuButton as={IconButton} {...props} {...menu} />;
};

export type MenuItemProps = HTMLAttributes<HTMLElement>;

export const MenuItem: FC<MenuItemProps> = (props) => {
  const menu = useMenuContext();

  return (
    <ReakitMenuItem
      {...props}
      {...menu}
      onClick={(evt) => {
        menu.hide();
        props.onClick?.(evt);
      }}
    />
  );
};

export interface MenuProps {
  button: ReactElement<MenuButtonProps>;
  children?:
    | (boolean | null | ReactElement<MenuItemProps>)
    | (boolean | null | ReactElement<MenuItemProps>)[];
}

export const Menu: FC<MenuProps> = ({ button, children }) => {
  const menu = useMenuState({ animated: styles.ANIMATION_DURATION_MS });

  return (
    <MenuContext.Provider value={menu}>
      {button}
      <ReakitMenu {...menu}>
        <div className={styles.items}>
          {Children.map(children, (child) =>
            isValidElement<MenuItemProps>(child)
              ? cloneElement<MenuItemProps>(child, {
                  className: clsx(styles.item, child.props.className),
                })
              : null,
          )}
        </div>
      </ReakitMenu>
    </MenuContext.Provider>
  );
};
