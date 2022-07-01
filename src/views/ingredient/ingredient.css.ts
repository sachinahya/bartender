import { style } from '@vanilla-extract/css';

import { vars } from '../../theme';

export const padding = style({
  padding: vars.space[4],
});

export const intro = style([
  padding,
  {
    // color: vars.colors.white,
  },
]);

export const pageTitle = style({
  marginBlockStart: vars.space[4],
  marginBlockEnd: vars.space[10],
});

export const drinkTiles = style({
  marginBlockStart: vars.space[8],
});
