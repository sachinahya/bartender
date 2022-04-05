import { style } from '@vanilla-extract/css';

import { listReset } from './styles/utility.css';
import { breakpoints, vars } from './theme';

export const footer = style({
  position: 'fixed',
  insetInline: 0,
  insetBlockEnd: 0,
  borderBlockStart: '1px solid',
  borderBlockStartColor: vars.colors.gray[300],
  backgroundColor: vars.colors.white,
  blockSize: vars.sizes[14],
  zIndex: vars.zIndices.banner,

  '@media': {
    [breakpoints.md]: {
      blockSize: vars.sizes[16],
    },
  },
});

export const footerClear = style({
  borderBlockStart: '1px solid transparent',
  blockSize: vars.sizes[14],

  '@media': {
    [breakpoints.md]: {
      blockSize: vars.sizes[16],
    },
  },
});

export const navList = style([
  listReset,
  {
    display: 'flex',

    height: '100%',
  },
]);

export const navListItem = style({
  fontSize: vars.fontSizes.sm,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: vars.space[2],
  rowGap: vars.space[1],
});

export const navListItemActive = style({
  color: vars.colors.brand[500],
});

export const navListItemIcon = style({
  flexGrow: 1,
  width: '100%',
  transition: 'transform 100ms linear',

  selectors: {
    [`${navListItemActive} &`]: {
      transform: 'scale(1.25)',
    },
  },
});
