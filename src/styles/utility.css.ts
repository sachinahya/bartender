import { style } from '@vanilla-extract/css';

export const noListBullet = style({
  listStyle: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E");`,
});

export const listReset = style([
  noListBullet,
  {
    margin: 0,
    padding: 0,
  },
]);
