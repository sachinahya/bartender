import { style } from '@vanilla-extract/css';

import { listReset } from '../../styles/utility.css';
import { breakpoints, vars } from '../../theme';

export const root = style([
  listReset,
  {
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gridTemplateColumns: '1fr',
    gap: vars.space[2],

    '@media': {
      [breakpoints.sm]: {
        // gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(12em, 1fr))',
        gap: vars.space[4],
      },
      [breakpoints.md]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(14.5em, 1fr))',
        // gridTemplateColumns: 'repeat(3, 1fr)',
        gap: vars.space[4],
      },
      [breakpoints.lg]: {
        // margin: vars.space[10],
        gridTemplateColumns: 'repeat(auto-fill, minmax(17em, 1fr))',
        gap: vars.space[6],
      },
    },
  },
]);
