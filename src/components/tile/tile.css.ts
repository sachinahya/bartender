import { createVar, style } from '@vanilla-extract/css';

import { vars } from '../../theme';

export const backgroundColorVar = createVar();

export const root = style({
  display: 'grid',
  alignItems: 'center',
  justifyItems: 'center',
  position: 'relative',
  backgroundColor: backgroundColorVar,
});

export const img = style({
  inlineSize: '100%',
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

export const overlayLink = style({
  marginBlockStart: '-100%',
  opacity: 0,
  WebkitTapHighlightColor: 'transparent',
});

export const category = style({
  color: vars.colors.whiteAlpha[700],
});
