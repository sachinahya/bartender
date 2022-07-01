import { generateQuery } from '../../data';
import { Ingredient } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const {
  useDataQuery: useIngredientQuery,
  useRouteMatchedDataQuery: useMatchedIngredientQuery,
  useLoader: useIngredientLoader,
} = generateQuery<{ name: string }, Ingredient, ApiContext>({
  key: 'ingredient',
  fetcher: async ({ name }, context) => context.meta.store.getIngredientByName(name),
  getMatchParams: (match) =>
    match.params.name ? { name: decodeURIComponent(match.params.name) } : null,
  useQueryContextMeta: useApiContext,
});
