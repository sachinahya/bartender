import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '../../theme';

const spinnerAnim = keyframes({
  '0%': {
    transform: 'rotate(0deg) scale(1)',
  },
  '50%': {
    transform: 'rotate(180deg) scale(0.8)',
  },
  '100%': {
    transform: 'rotate(360deg) scale(1)',
  },
});

export const spinner = style({
  boxSizing: 'border-box',
  display: 'inline-block',
  width: '1em',
  height: '1em',
  border: '2px solid currentColor',
  borderBottomColor: 'transparent',
  borderRadius: vars.radii.full,
  animation: `${spinnerAnim} 0.75s 0s infinite linear`,
  animationFillMode: 'both',
});
