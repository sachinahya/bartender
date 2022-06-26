import { generateQuery } from '../../data';
import { Ingredient } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const { useDataQuery: useIngredientsQuery, useLoader: useIngredientsLoader } = generateQuery<
  Ingredient[],
  ApiContext
>({
  key: 'ingredients',
  fetcher: async (context) => context.meta.store.getIngredients(),
  useQueryContextMeta: useApiContext,
});
