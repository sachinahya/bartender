import { forwardRef, ReactElement } from 'react';

import { Button, ButtonProps } from '../button';

export interface BannerActionProps extends ButtonProps {
  icon?: ReactElement;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const BannerAction = forwardRef<HTMLButtonElement, BannerActionProps>(function BannerAction(
  // eslint-disable-next-line react/prop-types -- https://github.com/yannickcr/eslint-plugin-react/issues/3140
  { icon, children = icon, isLoading, isDisabled, ...props },
  ref,
) {
  return (
    <Button ref={ref} disabled={isDisabled} loading={isLoading} variant="minimal" {...props}>
      {children}
    </Button>
  );
});
