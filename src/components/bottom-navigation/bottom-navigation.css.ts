import { style } from '@vanilla-extract/css';

import { listReset } from '../../styles/utility.css';
import { breakpoints, vars } from '../../theme';

const footerSize = style({
  blockSize: vars.sizes[14],
  borderBlockStart: '1px solid',

  '@media': {
    [breakpoints.md]: {
      blockSize: vars.sizes[16],
    },
  },
});

export const footer = style([
  footerSize,
  {
    position: 'fixed',
    insetInline: 0,
    insetBlockEnd: 0,
    zIndex: vars.zIndices.banner,
    backgroundColor: vars.colors.white,
    borderBlockStartColor: vars.colors.gray[300],
    display: 'flex',
  },
]);

export const footerClear = style([
  footerSize,
  {
    borderBlockStartColor: 'transparent',
  },
]);

export const navList = style([
  listReset,
  {
    display: 'flex',
    flexGrow: 1,
  },
]);

export const navListItem = style({
  flexGrow: 1,
  display: 'flex',
});

export const navListItemLink = style({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: vars.space[2],
  padding: vars.space[2],
  fontSize: vars.fontSizes.sm,
  color: 'inherit',
  textDecoration: 'none',
  lineHeight: vars.lineHeights.none,
  whiteSpace: 'nowrap',
});

export const navListItemLinkActive = style({
  color: vars.colors.brand[500],
});

export const navListItemLinkIcon = style({
  width: '1em',
  height: '1em',
  transition: 'transform 100ms linear',

  selectors: {
    [`${navListItemLinkActive} &`]: {
      transform: 'scale(1.25)',
    },
  },
});
