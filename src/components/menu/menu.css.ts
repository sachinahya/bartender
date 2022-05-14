import { style } from '@vanilla-extract/css';

import { vars } from '../../theme';
import { styles as buttonBaseStyles } from '../button-base';

export const ANIMATION_DURATION_MS = 150;

export const root = style({
  position: 'relative',
});

export const items = style({
  position: 'absolute',
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.white,
  color: vars.colors.black,
  border: `1px solid ${vars.colors.gray[300]}`,
  marginBlockStart: vars.space[1],
  paddingBlock: vars.space[1],
  borderRadius: vars.radii.base,
  outline: 0,
});

export const itemsTransition = style({
  transition: `opacity ${ANIMATION_DURATION_MS}ms ease-in-out, transform ${ANIMATION_DURATION_MS}ms ease-in-out`,
});

export const itemsEnter = style({
  opacity: 1,
  transform: 'translateY(0)',
});

export const itemsLeave = style({
  opacity: 0,
  transform: 'translateY(-10px)',
});

export const item = style([
  buttonBaseStyles.reset,
  {
    textAlign: 'start',
    padding: vars.space[3],
    outline: 0,
    cursor: 'pointer',

    selectors: {
      '&:hover:not(:disabled), &:focus:not(:disabled)': {
        backgroundColor: vars.colors.gray[100],
      },
    },
  },
]);

export const itemActive = style({
  backgroundColor: vars.colors.gray[100],
});

export const itemDisabled = style({
  color: vars.colors.gray[300],
});
