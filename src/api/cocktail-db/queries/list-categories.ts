import { generateQuery } from '../../../data';
import { Category } from '../../../entities';
import { CategoriesResponseItem } from '../response';

import { CocktailApiContext, fetchList, getListUrl, useApiContext } from './common';

export const { useDataQuery: useCategoriesQuery, useLoader: useCategoriesLoader } = generateQuery<
  Category[],
  CocktailApiContext
>({
  key: 'categories',
  fetcher: async (context) => {
    const url = getListUrl(context.meta.token, 'c');
    return fetchList<CategoriesResponseItem, Category>(url, (category) => ({
      name: category.strCategory,
    }));
  },
  useQueryContextMeta: useApiContext,
});
