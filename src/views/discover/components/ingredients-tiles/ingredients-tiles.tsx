import { FC, HTMLAttributes } from 'react';

import { useIngredientsQuery } from '../../../../api/cocktail-db';
import { Tile, Tiles } from '../../../../components/tile';
import { Ingredient } from '../../../../entities';
import { useCallbackRef, usePalette } from '../../../../utils';

import * as styles from './ingredients-tiles.css';

export interface IngredientsTilesProps extends HTMLAttributes<HTMLElement> {}

const IngredientTile: FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
  const [imageRef, setImageRef] = useCallbackRef<HTMLImageElement>();
  const { palette } = usePalette(imageRef);

  return (
    <Tile
      key={ingredient.name}
      tileTitle={ingredient.name}
      image={
        <img
          loading="lazy"
          crossOrigin="anonymous"
          src={ingredient.images[100]}
          srcSet={`${ingredient.images[100]} 100w, ${ingredient.images[350]} 350w, ${ingredient.images[700]} 700w`}
          sizes="30vw"
          alt={ingredient.name}
          ref={setImageRef}
          className={styles.image}
        />
      }
      href=""
      backgroundColor={palette?.lightVibrant}
    />
  );
};

export const IngredientsTiles: FC<IngredientsTilesProps> = (props) => {
  const { data: ingredients = [] } = useIngredientsQuery();

  return (
    <Tiles variant="grid" {...props}>
      {ingredients.map((ingredient) => (
        <IngredientTile key={ingredient.name} ingredient={ingredient} />
      ))}
    </Tiles>
  );
};
