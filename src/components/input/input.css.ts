import { createVar, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme';
import { styles } from '../control';

const localVars = {
  focusColor: createVar('focus-color'),
};

export const base = style({
  width: '100%',
  appearance: 'none',
  borderRadius: vars.radii.base,
  border: `1px solid ${vars.colors.gray[300]}`,

  ':focus': {
    outline: `2px solid ${localVars.focusColor}`,
    outlineOffset: -1,
  },

  '@supports': {
    'selector(:focus-visible)': {
      ':focus': {
        outline: 'none',
      },

      ':focus-visible': {
        outline: `2px solid ${localVars.focusColor}`,
        outlineOffset: -1,
      },
    },
  },
});

export const lineHeightReset = style({
  lineHeight: vars.lineHeights.none,
});

export const input = styleVariants({
  primary: [
    base,
    {
      vars: {
        [localVars.focusColor]: vars.colors.brand[500],
      },
    },
  ],
});

export const { size } = styles;
