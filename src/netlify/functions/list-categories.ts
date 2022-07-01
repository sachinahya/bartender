import { StatusCodes } from 'http-status-codes';

import { Category } from '../../entities';
import { fetchList, getListUrl } from '../cocktail-db/api';
import { CategoriesResponseItem } from '../cocktail-db/response';
import { Handler } from '../middleware/common';
import { middleware } from '../middleware/middleware';

const listCategories: Handler = async () => {
  const url = getListUrl('c');

  const result = await fetchList(
    'drinks',
    url,
    (category: CategoriesResponseItem): Category => ({
      name: category.strCategory,
    }),
  );

  return {
    statusCode: StatusCodes.OK,
    body: result,
  };
};

export const handler = middleware(listCategories);
