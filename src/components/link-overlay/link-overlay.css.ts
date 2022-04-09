import { style } from '@vanilla-extract/css';

export const linkBox = style({});

export const linkOverlay = style({
  selectors: {
    [`${linkBox} &`]: {
      position: 'static',
    },

    [`${linkBox} &::before`]: {
      content: "''",
      cursor: 'inherit',
      display: 'block',
      position: 'absolute',
      inset: 0,
      zIndex: 1,
    },
  },
});
