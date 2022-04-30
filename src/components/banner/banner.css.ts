import { style, styleVariants } from '@vanilla-extract/css';

import { breakpoints, vars } from '../../theme';

export const bannerBase = style({
  display: 'flex',
  alignItems: 'center',
  blockSize: vars.sizes[12],
  paddingInline: vars.space[2],
  position: 'fixed',
  insetInline: 0,
  insetBlockStart: 0,
  zIndex: vars.zIndices.banner,
});

export const banner = styleVariants({
  heavy: [
    bannerBase,
    {
      backgroundColor: vars.colors.brand[500],
      color: vars.colors.white,
    },
  ],
  thin: [
    bannerBase,
    {
      backgroundImage: `linear-gradient(to bottom, ${vars.colors.blackAlpha[700]}, transparent)`,
      color: vars.colors.white,
    },
  ],
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
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const bannerAction = style({
  color: 'inherit',
});
