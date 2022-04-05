import { style } from '@vanilla-extract/css';

import { vars } from '../../theme';
import { styles as buttonStyles } from '../button';

export const ANIMATION_DURATION_MS = 150;

export const items = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.gray[300]}`,
  marginBlockStart: vars.space[1],
  paddingBlock: vars.space[1],
  borderRadius: vars.radii.base,
  outline: 0,

  transition: `opacity ${ANIMATION_DURATION_MS}ms ease-in-out, transform ${ANIMATION_DURATION_MS}ms ease-in-out`,
  opacity: 0,
  transform: 'translateY(-10px)',

  selectors: {
    '[data-enter] &': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '[data-leave] &': {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
  },
});

export const itemsInner = style({});

export const item = style([
  buttonStyles.reset,
  {
    textAlign: 'start',
    padding: vars.space[3],
    outline: 0,
    cursor: 'pointer',

    ':hover': {
      backgroundColor: vars.colors.gray[100],
    },

    ':focus': {
      backgroundColor: vars.colors.gray[100],
    },
  },
]);
