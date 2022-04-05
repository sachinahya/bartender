import { style } from '@vanilla-extract/css';

import { breakpoints, vars } from '../../theme';

export const banner = style({
  display: 'flex',
  alignItems: 'center',
  blockSize: vars.sizes[12],
  paddingInline: vars.space[2],
  position: 'fixed',
  insetInline: 0,
  insetBlockStart: 0,
  zIndex: vars.zIndices.banner,
});

export const bannerClear = style({
  blockSize: vars.sizes[12],

  '@media': {
    [breakpoints.md]: {
      blockSize: vars.sizes[16],
    },
  },
});

export const bannerTitle = style({
  flexGrow: 1,
  marginInline: vars.space[2],
  color: vars.colors.brand[600],
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
