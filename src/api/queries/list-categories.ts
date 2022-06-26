import { generateQuery } from '../../data';
import { Category } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const { useDataQuery: useCategoriesQuery, useLoader: useCategoriesLoader } = generateQuery<
  Category[],
  ApiContext
>({
  key: 'categories',
  fetcher: async (context) => context.meta.store.getCategories(),
  useQueryContextMeta: useApiContext,
});
