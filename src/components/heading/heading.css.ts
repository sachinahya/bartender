import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme';

const base = style({
  fontFamily: vars.fonts.heading,
  fontWeight: vars.fontWeights.heading,
  lineHeight: vars.lineHeights.shorter,
  marginBlock: vars.space[2],
});

export const heading = styleVariants({
  h1: [
    base,
    {
      fontSize: vars.fontSizes['3xl'],

      // '@media': {
      //   [breakpoints.md]: {
      //     fontSize: vars.fontSizes['4xl'],
      //   },
      // },
    },
  ],
  h2: [
    base,
    {
      fontSize: vars.fontSizes['2xl'],

      // '@media': {
      //   [breakpoints.md]: {
      //     fontSize: vars.fontSizes['3xl'],
      //   },
      // },
    },
  ],
  h3: [
    base,
    {
      fontSize: vars.fontSizes['xl'],

      // '@media': {
      //   [breakpoints.md]: {
      //     fontSize: vars.fontSizes['2xl'],
      //   },
      // },
    },
  ],
  h4: [
    base,
    {
      fontSize: vars.fontSizes['lg'],

      // '@media': {
      //   [breakpoints.md]: {
      //     fontSize: vars.fontSizes['xl'],
      //   },
      // },
    },
  ],
  h5: [
    base,
    {
      fontSize: vars.fontSizes['md'],
    },
  ],
  h6: [
    base,
    {
      fontSize: vars.fontSizes['sm'],
    },
  ],
});
