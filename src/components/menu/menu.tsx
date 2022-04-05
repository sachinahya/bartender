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

import { Button, ButtonProps } from '../button';

import * as styles from './menu.css';

const MenuContext = createContext<ReakitMenuStateReturn | null>(null);

const useMenuContext = (): ReakitMenuStateReturn => {
  const menu = useContext(MenuContext);

  if (!menu) {
    throw new Error('No menu state.');
  }

  return menu;
};

export const MenuButton: FC<ButtonProps> = (props) => {
  const menu = useMenuContext();

  return <ReakitMenuButton as={Button} {...props} {...menu} />;
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
  button?: ReactElement<ButtonProps> | ButtonProps;
  children?: (boolean | null | ReactElement<MenuItemProps>)[];
}

export const Menu: FC<MenuProps> = ({ button, children }) => {
  const menu = useMenuState({ animated: styles.ANIMATION_DURATION_MS });

  return (
    <MenuContext.Provider value={menu}>
      {isValidElement<ButtonProps>(button) ? button : <MenuButton {...button} />}
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
