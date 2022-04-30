import clsx from 'clsx';
import { forwardRef } from 'react';

import { IconButton, IconButtonProps } from '../icon-button';

import * as styles from './banner.css';

export interface BannerActionProps extends IconButtonProps {}

export const BannerAction = forwardRef<HTMLButtonElement, BannerActionProps>(function BannerAction(
  // eslint-disable-next-line react/prop-types -- https://github.com/yannickcr/eslint-plugin-react/issues/3140
  props,
  ref,
) {
  return (
    <IconButton
      ref={ref}
      variant="minimal"
      {...props}
      className={clsx(styles.bannerAction, props.className)}
    />
  );
});
