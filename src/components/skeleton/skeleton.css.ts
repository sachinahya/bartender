import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '../../theme';

const animation = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.6 },
  '100%': { opacity: 1 },
});

export const root = style({
  animationDuration: '2s',
  animationDelay: '0.5s',
  animationIterationCount: 'infinite',
  animationName: animation,
  animationTimingFunction: 'ease-in-out',
  backgroundColor: vars.colors.gray[300],
});
