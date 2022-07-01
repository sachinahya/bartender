import { Drink, DrinkIngredient, Ingredient, IngredientListItem } from '../../entities';
import { getPalette } from '../get-palette';

import { getImagesUrl } from './api';
import { DrinksResponseItem, IngredientResponseItem, IngredientsResponseItem } from './response';

const createIngredientMapper =
  <T>(nameSelector: (item: T) => string) =>
  async (item: T): Promise<IngredientListItem> => {
    const name = nameSelector(item);

    const imageUrl700 = getImagesUrl();
    imageUrl700.pathname += `/ingredients/${encodeURIComponent(name)}.png`;
    const imageUrl350 = getImagesUrl();
    imageUrl350.pathname += `/ingredients/${encodeURIComponent(name)}-Medium.png`;
    const imageUrl100 = getImagesUrl();
    imageUrl100.pathname += `/ingredients/${encodeURIComponent(name)}-Small.png`;

    return {
      name,
      palette: await getPalette(imageUrl700),
      images: {
        100: imageUrl100.toString(),
        350: imageUrl350.toString(),
        700: imageUrl700.toString(),
      },
    };
  };

export const mapIngredientsListItem = createIngredientMapper<IngredientsResponseItem>(
  (item) => item.strIngredient1,
);

const mapIngredientListItem = createIngredientMapper<IngredientResponseItem>(
  (item) => item.strIngredient,
);

export const mapIngredientItem = async (item: IngredientResponseItem): Promise<Ingredient> => {
  const ingredientListItem = await mapIngredientListItem(item);

  return {
    ...ingredientListItem,
    id: item.idIngredient,
    description: item.strDescription,
    type: item.strType,
    alcoholic: item.strAlcohol,
    abv: item.strABV || undefined,
  };
};

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
