import { generateQuery } from '../../data';
import { DrinkListItem } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const {
  useDataQuery: useDrinksByIngredientQuery,
  useRouteMatchedDataQuery: useMatchedDrinksByIngredientQuery,
  useLoader: useDrinksByIngredientLoader,
} = generateQuery<{ name: string }, DrinkListItem[], ApiContext>({
  key: 'drinksByIngredient',
  fetcher: async ({ name }, context) => context.meta.store.getDrinksByIngredient(name),
  getMatchParams: (match) =>
    match.params.name ? { name: decodeURIComponent(match.params.name) } : null,
  useQueryContextMeta: useApiContext,
});
