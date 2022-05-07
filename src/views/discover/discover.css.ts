import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

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
  // TODO: Use an accessible method to hide this.
  display: 'none',
});

export const sectionTitle = style({
  marginBlockStart: vars.space[4],
  marginBlockEnd: vars.space[10],
});

export const slider = style({
  marginInlineEnd: calc.negate(vars.space[4]),
});
