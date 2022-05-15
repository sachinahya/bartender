import { FC, HTMLAttributes } from 'react';

import { useRandomDrinksQuery } from '../../../../api/cocktail-db';
import { Tiles, Tile } from '../../../../components/tile';

export interface RandomDrinksTilesProps extends HTMLAttributes<HTMLElement> {}

export const RandomDrinksTiles: FC<RandomDrinksTilesProps> = (props) => {
  const { data: drinks = [] } = useRandomDrinksQuery();

  return (
    <Tiles variant="slider" {...props}>
      {drinks.map((drink) => (
        <Tile
          key={drink.id}
          tileTitle={drink.name}
          subtitle={drink.category}
          image={drink.image}
          imageAlt={drink.name}
          href={`/drink/${drink.id}`}
        />
      ))}
    </Tiles>
  );
};
