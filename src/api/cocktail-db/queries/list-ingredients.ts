import { generateQuery } from '../../../data';
import { Ingredient } from '../../../entities';
import { IngredientsResponseItem } from '../response';

import { CocktailApiContext, fetchList, getListUrl, useApiContext } from './common';

export const { useDataQuery: useIngredientsQuery, useLoader: useIngredientsLoader } = generateQuery<
  Ingredient[],
  CocktailApiContext
>({
  key: 'ingredients',
  fetcher: async (context) => {
    const url = getListUrl(context.meta.token, 'i');
    return fetchList<IngredientsResponseItem, Ingredient>(url, (ingredient) => ({
      name: ingredient.strIngredient1,
    }));
  },
  useQueryContextMeta: useApiContext,
});
