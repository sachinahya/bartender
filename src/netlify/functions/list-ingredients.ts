import { StatusCodes } from 'http-status-codes';

import { Ingredient } from '../../entities';
import { fetchList, getImagesUrl, getListUrl } from '../cocktail-db/api';
import { IngredientsResponseItem } from '../cocktail-db/response';
import { getPalette } from '../get-palette';
import { Handler } from '../middleware/common';
import { middleware } from '../middleware/middleware';

const listIngredients: Handler = async () => {
  const url = getListUrl('i');

  const result = await fetchList<IngredientsResponseItem, Ingredient>(url, async (ingredient) => {
    const name = ingredient.strIngredient1;

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
  });

  return {
    statusCode: StatusCodes.OK,
    body: result,
  };
};

export const handler = middleware(listIngredients);
