import { style } from '@vanilla-extract/css';

import { listReset } from '../../styles/utility.css';
import { vars } from '../../theme';

export const root = style([
  listReset,
  {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: vars.space[2],
  },
]);
