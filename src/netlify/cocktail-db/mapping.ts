import { Drink, DrinkIngredient } from '../../entities';
import { getPalette } from '../get-palette';

import { DrinksResponseItem } from './response';

export const responseToEntity = async (item: DrinksResponseItem): Promise<Drink> => {
  const ingredients: DrinkIngredient[] = [
    [item.strIngredient1, item.strMeasure1],
    [item.strIngredient2, item.strMeasure2],
    [item.strIngredient3, item.strMeasure3],
    [item.strIngredient4, item.strMeasure4],
    [item.strIngredient5, item.strMeasure5],
    [item.strIngredient6, item.strMeasure6],
    [item.strIngredient7, item.strMeasure7],
    [item.strIngredient8, item.strMeasure8],
    [item.strIngredient9, item.strMeasure9],
    [item.strIngredient10, item.strMeasure10],
    [item.strIngredient11, item.strMeasure11],
    [item.strIngredient12, item.strMeasure12],
    [item.strIngredient13, item.strMeasure13],
    [item.strIngredient14, item.strMeasure14],
    [item.strIngredient15, item.strMeasure15],
  ]
    .map<DrinkIngredient | undefined>(([name, measure]) =>
      name?.trim() && measure?.trim()
        ? {
            name: name.trim(),
            measure: measure.trim(),
          }
        : undefined,
    )
    .filter(Boolean) as DrinkIngredient[];

  return {
    id: item.idDrink,
    name: item.strDrink,
    alternateName: item.strDrinkAlternate || undefined,
    tags: item.strTags?.split(',') || [],
    category: item.strCategory,
    alcoholic: item.strAlcoholic,
    glass: item.strGlass,
    image: item.strDrinkThumb,
    palette: await getPalette(item.strDrinkThumb),
    instructions: item.strInstructions.split('\r\n').filter(Boolean),
    ingredients,
  };
};
