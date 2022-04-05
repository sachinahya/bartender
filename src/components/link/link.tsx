import {
  Link as ReactLocationLink,
  LinkProps as ReactLocationLinkProps,
} from '@tanstack/react-location';
import clsx from 'clsx';
import { AnchorHTMLAttributes, FC } from 'react';

import * as styles from './link.css';

export interface LinkProps extends ReactLocationLinkProps {
  // More type-specific.
  getActiveProps?: () => AnchorHTMLAttributes<HTMLAnchorElement>;
  getInactiveProps?: () => AnchorHTMLAttributes<HTMLAnchorElement>;

  activeClassName?: string;
}

export const Link: FC<LinkProps> = ({ activeClassName, ...props }) => {
  const getMergedProps =
    (
      propsGetter: (() => AnchorHTMLAttributes<HTMLAnchorElement>) | undefined,
      additionalClassName?: string,
    ) =>
    () => {
      const gottenProps = propsGetter?.();
      return {
        ...gottenProps,
        className: clsx(styles.link, props.className, gottenProps?.className, additionalClassName),
      };
    };

  return (
    <ReactLocationLink
      {...props}
      getActiveProps={getMergedProps(props.getActiveProps, activeClassName)}
      getInactiveProps={getMergedProps(props.getInactiveProps)}
    />
  );
};
