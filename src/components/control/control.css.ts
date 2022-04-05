import { styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme';

export const size = styleVariants({
  small: {
    fontSize: vars.fontSizes.sm,
    padding: vars.space[2],
  },
  normal: {
    fontSize: vars.fontSizes.md,
    padding: vars.space[3],
  },
});
