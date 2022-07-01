import { createVar, style } from '@vanilla-extract/css';

import { vars } from '../../theme';

export const containerMinHeightVar = createVar('container');
export const backgroundImageVar = createVar('image');
export const backgroundMaxHeightVar = createVar('height');

export const root = style({
  position: 'relative',
  overflow: 'hidden',
  minBlockSize: containerMinHeightVar,

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
    backgroundImage: `linear-gradient(to bottom, ${vars.colors.whiteAlpha[500]} 0%, ${vars.colors.whiteAlpha[800]} 70%, ${vars.colors.white} 100%)`,
  },
});

export const content = style({});
