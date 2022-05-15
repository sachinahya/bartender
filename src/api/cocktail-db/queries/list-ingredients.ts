import { generateQuery } from '../../../data';
import { Ingredient } from '../../../entities';
import { delay } from '../../../utils';
import { IngredientsResponseItem } from '../response';

import { CocktailApiContext, fetchList, getImagesUrl, getListUrl, useApiContext } from './common';

export const { useDataQuery: useIngredientsQuery, useLoader: useIngredientsLoader } = generateQuery<
  Ingredient[],
  CocktailApiContext
>({
  key: 'ingredients',
  fetcher: async (context) => {
    const url = getListUrl(context.meta.token, 'i');
    await delay(2000);
    return fetchList<IngredientsResponseItem, Ingredient>(url, (ingredient) => {
      const name = ingredient.strIngredient1;

      const imageUrl700 = getImagesUrl();
      imageUrl700.pathname += `/ingredients/${encodeURIComponent(name)}.png`;
      const imageUrl350 = getImagesUrl();
      imageUrl350.pathname += `/ingredients/${encodeURIComponent(name)}-Medium.png`;
      const imageUrl100 = getImagesUrl();
      imageUrl100.pathname += `/ingredients/${encodeURIComponent(name)}-Small.png`;

      return {
        name,
        images: {
          100: imageUrl100.toString(),
          350: imageUrl350.toString(),
          700: imageUrl700.toString(),
        },
      };
    });
  },
  useQueryContextMeta: useApiContext,
});
