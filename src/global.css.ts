import { globalStyle } from '@vanilla-extract/css';

import { breakpoints, vars } from './theme';

globalStyle('html', {
  // fontSize: '0.875em',

  '@media': {
    [breakpoints.md]: {
      fontSize: '1em',
    },
  },
});

globalStyle('body', {
  backgroundColor: vars.colors.white,
  color: vars.colors.black,
  fontFamily: vars.fonts.body,
  fontWeight: vars.fontWeights.normal,
  lineHeight: vars.lineHeights.base,
  fontSize: vars.fontSizes.md,
});
