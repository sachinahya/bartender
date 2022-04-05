import { style } from '@vanilla-extract/css';

import { vars } from '../../theme';

export const root = style({
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'center',
  position: 'relative',
});

export const img = style({
  maxInlineSize: '100%',
});

export const header = style({});

export const content = style({
  position: 'absolute',
  insetInline: 0,
  insetBlockEnd: 0,
  padding: vars.space[2],
  backgroundColor: vars.colors.blackAlpha[700],
  color: vars.colors.white,
  backdropFilter: 'blur(4px)',
  fontSize: vars.fontSizes.sm,
  textAlign: 'center',
});

export const link = style({
  color: 'inherit',
  textDecoration: 'none',
});

export const category = style({
  color: vars.colors.whiteAlpha[700],
});
