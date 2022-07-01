import { generateQuery } from '../../data';
import { IngredientListItem } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const { useDataQuery: useIngredientsQuery, useLoader: useIngredientsLoader } = generateQuery<
  IngredientListItem[],
  ApiContext
>({
  key: 'ingredients',
  fetcher: async (context) => context.meta.store.getIngredients(),
  useQueryContextMeta: useApiContext,
});
