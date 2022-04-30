import { style } from '@vanilla-extract/css';

import { vars } from '../../theme';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[1],

  position: 'relative',

  verticalAlign: 'middle',

  fontWeight: vars.fontWeights.medium,
  textTransform: 'uppercase',
});

export const inner = style({
  position: 'relative',
  flexGrow: 1,
});

export const textProgressNoIcon = style({
  opacity: 0,
});

export const progressOverlay = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const icon = style({
  display: 'block',
});
