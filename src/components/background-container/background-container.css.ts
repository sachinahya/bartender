import { createVar, style } from '@vanilla-extract/css';

import { vars } from '../../theme';

export const backgroundImageVar = createVar();
export const backgroundMaxHeightVar = createVar();

export const root = style({
  position: 'relative',
  overflow: 'hidden',

  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    backgroundImage: backgroundImageVar,
    backgroundSize: 'cover',
    filter: 'blur(20px)',
    transform: 'scale(1.25)',
    maxBlockSize: backgroundMaxHeightVar,
  },

  '::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    backgroundImage: `linear-gradient(180deg, ${vars.colors.whiteAlpha[100]} 10%, ${vars.colors.whiteAlpha[400]} 30%, ${vars.colors.white})`,
  },
});

export const content = style({});
