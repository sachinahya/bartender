import { FC } from 'react';
import type { Except } from 'type-fest';

import { useRandomDrinksQuery } from '../../../../api/cocktail-db';
import { DrinkTiles, TilesProps } from '../../../../components/tile';

export interface RandomDrinksTilesProps extends Except<TilesProps, 'children'> {
  count: number;
}

export const RandomDrinksTiles: FC<RandomDrinksTilesProps> = ({ count, ...props }) => {
  const { data: drinks = [] } = useRandomDrinksQuery({ count });

  return <DrinkTiles drinks={drinks} {...props} />;
};
