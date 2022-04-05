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
});

const base = style([
  reset,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space[1],

    borderRadius: vars.radii.base,
    cursor: 'pointer',
    position: 'relative',

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
  },
]);

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

export const button = styleVariants({
  primary: [
    base,
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
    base,
    {
      vars: {
        [localVars.backgroundColor]: 'transparent',
        [localVars.color]: vars.colors.brand[600],

        [localVars.hover.backgroundColor]: vars.colors.brand[100],
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
