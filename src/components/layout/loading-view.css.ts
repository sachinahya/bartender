import { style } from '@vanilla-extract/css';

import { vars } from '../../theme';

export const main = style({
  marginBlockStart: vars.space[20],
});

export const loader = style({
  display: 'block',
  marginInline: 'auto',
  fontSize: '10em',
  color: vars.colors.brand[500],
});
