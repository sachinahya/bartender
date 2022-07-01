import { createVar, style } from '@vanilla-extract/css';

import { listReset } from '../../styles/utility.css';
import { vars } from '../../theme';

export const vibrantVar = createVar();
export const lightMutedVar = createVar();
export const darkVibrantVar = createVar();

export const root = style({
  display: 'flex',
  flexDirection: 'column',
});

export const header = style({
  order: 2,
  backgroundColor: vars.colors.white,
  position: 'relative',
  zIndex: 1,
  // padding: vars.space[8],
});

export const drinkName = style({
  color: darkVibrantVar,
  marginBlockStart: vars.space[8],
  marginBlockEnd: vars.space[6],
  marginInline: vars.space[8],
  textAlign: 'center',
});

export const image = style({
  order: 1,
  maxInlineSize: '100%',
  marginBlockEnd: '-20vw',
  willChange: 'transform',
  aspectRatio: '1/1',
  backgroundColor: lightMutedVar,
});

export const main = style({
  order: 3,
  backgroundColor: vars.colors.white,
  paddingInline: vars.space[8],
  position: 'relative',
  zIndex: 1,
});

export const ingredients = style([
  listReset,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space[2],
  },
]);

export const ingredientItem = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: vars.space[2],
});

export const ingredientName = style({
  fontWeight: vars.fontWeights.medium,
  fontSize: vars.fontSizes.lg,
});

export const ingredientMeasure = style({
  color: vars.colors.blackAlpha[600],
  order: 2,
  fontSize: vars.fontSizes.md,
});

export const ingredientLink = style({
  color: vars.colors.black,
  textDecoration: 'none',

  ':hover': {
    color: vibrantVar,
    textDecoration: 'underline',
  },
});

export const instructions = style([
  ingredients,
  {
    gap: vars.space[6],
  },
]);

export const subheading = style({
  color: darkVibrantVar,
  textAlign: 'center',
  marginBlockStart: vars.space[8],
  marginBlockEnd: vars.space[6],
});

export const tags = style([
  listReset,
  {
    display: 'flex',
    justifyContent: 'center',
    gap: vars.space[2],
  },
]);

export const tagItem = style({
  backgroundColor: lightMutedVar,
  borderRadius: vars.radii.base,
  padding: vars.space[2],
  lineHeight: vars.lineHeights.none,
});
