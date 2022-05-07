import { ComplexStyleRule, style, styleVariants } from '@vanilla-extract/css';

import { listReset } from '../../styles/utility.css';
import { vars } from '../../theme';

const MIN_TILE_SIZE = '10em';
const MAX_TILE_SIZE = '17em';

const variantContract = styleVariants({
  grid: {},
  slider: {},
});

type VariantStyles = { [K in keyof typeof variantContract]?: ComplexStyleRule };

export type Variant = keyof VariantStyles;

export const root = styleVariants<VariantStyles>({
  slider: {
    overflowY: 'auto',
  },
});

const listBase = style([
  listReset,
  {
    // Fluid gap between 2-6 theme spacing.
    // Ideal spacing is vw instead of % as we don't want it relative to container width.
    gap: `clamp(${vars.space[2]}, 2vw, ${vars.space[6]})`,
  },
]);

export const list = styleVariants<VariantStyles>({
  slider: [
    listBase,
    {
      display: 'flex',
    },
  ],
  grid: [
    listBase,
    {
      display: 'grid',
      // 18% aims to give us approx 5 columns when we factor in the gap, and clamping prevents tiles
      // getting too small or too big.
      gridTemplateColumns: `repeat(auto-fill, minmax(clamp(${MIN_TILE_SIZE}, 18%, ${MAX_TILE_SIZE}), 1fr))`,
    },
  ],
});

export const item = styleVariants<VariantStyles>({
  slider: {
    flexShrink: 0,
    // Compared to grid this doesn't try and fit a specific number of tiles to the screen.
    // Instead we add the same smallest and largest sizes and add a nice fluid middle ground in vw.
    // This effectively displays as many tiles as we can comfortably fit on the screen.
    flexBasis: `clamp(${MIN_TILE_SIZE}, 20vw, ${MAX_TILE_SIZE})`,
  },
});
