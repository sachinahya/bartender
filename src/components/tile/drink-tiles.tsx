import { FC } from 'react';
import type { Except } from 'type-fest';

import { Drink } from '../../entities';

import { Tile, TileProps } from './tile';
import { Tiles, TilesProps } from './tiles';

interface DrinkTileProps extends Partial<TileProps> {
  drink: Drink;
}

const DrinkTile: FC<DrinkTileProps> = ({ drink, ...props }) => {
  return (
    <Tile
      {...props}
      tileTitle={drink.name}
      subtitle={drink.category}
      image={drink.image}
      imageAlt={drink.name}
      href={`/drink/${drink.id}`}
    />
  );
};

export interface DrinkTilesProps extends Except<TilesProps, 'children'> {
  drinks: Drink[];
}

export const DrinkTiles: FC<DrinkTilesProps> = ({ drinks, ...props }) => {
  return (
    <Tiles {...props}>
      {drinks.map((drink) => (
        <DrinkTile key={drink.id} drink={drink} />
      ))}
    </Tiles>
  );
};
