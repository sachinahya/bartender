import { createVar, style } from '@vanilla-extract/css';

export const backgroundColorVar = createVar();

export const segment = style({
  backgroundColor: backgroundColorVar,
});

export const root = style({
  fontSize: 12,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  textAlign: 'center',
  lineHeight: 2,
  marginBlockStart: 20,
});
