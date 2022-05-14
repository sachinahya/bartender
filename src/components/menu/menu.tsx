import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment, HTMLAttributes, ReactElement } from 'react';

import { IconButton, IconButtonProps } from '../icon-button';

import * as styles from './menu.css';

export interface MenuButtonProps extends IconButtonProps {}

export const MenuButton: FC<MenuButtonProps> = (props) => {
  return (
    <HeadlessMenu.Button as={Fragment}>
      <IconButton {...props} />
    </HeadlessMenu.Button>
  );
};

export interface MenuItemProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({ disabled, ...props }) => {
  return (
    <HeadlessMenu.Item disabled={disabled}>
      {({ active, disabled }) => (
        <button
          {...props}
          disabled={disabled}
          className={clsx(
            styles.item,
            active && styles.itemActive,
            disabled && styles.itemDisabled,
            props.className,
          )}
        />
      )}
    </HeadlessMenu.Item>
  );
};

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  button: ReactElement<MenuButtonProps>;
  children?:
    | (boolean | null | ReactElement<MenuItemProps>)
    | (boolean | null | ReactElement<MenuItemProps>)[];
}

export const Menu: FC<MenuProps> = ({ button, children, ...props }) => {
  return (
    <HeadlessMenu {...props} as="div" className={clsx(styles.root, props.className)}>
      {button}
      <Transition
        as={Fragment}
        enter={styles.itemsTransition}
        leave={styles.itemsTransition}
        enterFrom={styles.itemsLeave}
        enterTo={styles.itemsEnter}
        leaveFrom={styles.itemsEnter}
        leaveTo={styles.itemsLeave}
      >
        <HeadlessMenu.Items className={styles.items}>{children}</HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};
