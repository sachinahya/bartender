import { createVar, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme';

const localVars = {
  backgroundColor: createVar('background-color'),
  color: createVar('color'),
  hover: {
    backgroundColor: createVar('background-color-hover'),
    color: createVar('color-hover'),
  },
  focus: {
    color: createVar('color-focus'),
  },
  disabled: {
    backgroundColor: createVar('background-color-disabled'),
    color: createVar('color-disabled'),
  },
};

export const reset = style({
  appearance: 'none',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  lineHeight: vars.lineHeights.none,
  margin: 0,
  border: 0,
  padding: 0,
  backgroundColor: 'transparent',
  cursor: 'pointer',
  borderRadius: vars.radii.base,
});

const colours = style({
  backgroundColor: localVars.backgroundColor,
  color: localVars.color,
  verticalAlign: 'middle',

  fontWeight: vars.fontWeights.medium,
  textTransform: 'uppercase',

  ':hover': {
    backgroundColor: localVars.hover.backgroundColor,
    color: localVars.hover.color,
  },

  ':focus': {
    outline: `3px solid ${localVars.focus.color}`,
  },

  '@supports': {
    'selector(:focus-visible)': {
      ':focus': {
        outline: 'none',
      },

      ':focus-visible': {
        outline: `3px solid ${localVars.focus.color}`,
      },
    },
  },

  ':disabled': {
    backgroundColor: localVars.disabled.backgroundColor,
    color: localVars.disabled.color,
  },
});

export const colourVariants = styleVariants({
  primary: [
    colours,
    {
      vars: {
        [localVars.backgroundColor]: vars.colors.brand[500],
        [localVars.color]: vars.colors.white,

        [localVars.hover.backgroundColor]: vars.colors.brand[400],
        [localVars.hover.color]: vars.colors.white,

        [localVars.focus.color]: vars.colors.brand[300],

        [localVars.disabled.backgroundColor]: vars.colors.gray[300],
        [localVars.disabled.color]: vars.colors.white,
      },
    },
  ],
  minimal: [
    colours,
    {
      vars: {
        [localVars.backgroundColor]: 'transparent',
        [localVars.color]: vars.colors.brand[600],

        [localVars.hover.backgroundColor]: 'transparent',
        [localVars.hover.color]: vars.colors.brand[600],

        [localVars.focus.color]: vars.colors.brand[300],

        [localVars.disabled.backgroundColor]: 'transparent',
        [localVars.disabled.color]: vars.colors.gray[300],
      },
    },
  ],
});

export const size = styleVariants({
  small: {
    fontSize: vars.fontSizes.sm,
    padding: vars.space[1],
  },
  normal: {
    fontSize: vars.fontSizes.md,
    padding: vars.space[2],
  },
});
