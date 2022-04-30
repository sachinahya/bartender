import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { generateQuery } from '../generate-query';

import { useDrinkQuery } from './fetch-drink';
import { Drink } from './types';

const KEY = 'favourite-drinks';

export const add = (drink: Drink): Promise<void> => {
  const currentItem = localStorage.getItem(KEY);
  const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

  drinks.push(drink);

  const newItem = JSON.stringify(drinks);
  localStorage.setItem(KEY, newItem);

  return Promise.resolve();
};

export const remove = (id: string): Promise<void> => {
  const currentItem = localStorage.getItem(KEY);
  const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

  const index = drinks.findIndex((drink) => drink.id === id);

  if (index < 0) {
    throw new Error('Cannot delete drink');
  }

  drinks.splice(index, 1);

  const newItem = JSON.stringify(drinks);
  localStorage.setItem(KEY, newItem);

  return Promise.resolve();
};

export const is = (id: string): Promise<boolean> => {
  const currentItem = localStorage.getItem(KEY);
  const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

  return Promise.resolve(drinks.some((drink) => drink.id === id));
};

export const getAll = (): Promise<Drink[]> => {
  const currentItem = localStorage.getItem(KEY);
  const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

  return Promise.resolve(drinks);
};

export const {
  getKey: getIsFavouriteDrinkKey,
  useDataQuery: useIsFavouriteDrinkQuery,
  useRouteMatchedDataQuery: useIsMatchedFavouriteDrinkQuery,
} = generateQuery<{ id: string }, boolean>({
  key: 'favouriteDrink',
  fetcher: ({ id }) => is(id),
  getMatchParams: (routeMatch) => (routeMatch.params.id ? { id: routeMatch.params.id } : null),
});

export const {
  getKey: getFavouriteDrinksKey,
  useDataQuery: useFavouriteDrinksQuery,
  prefetchLoaderFactory: favouriteDrinksLoader,
} = generateQuery<Drink[]>({
  key: 'favouriteDrinks',
  fetcher: () => getAll(),
});

export const useFavouriteDrinkToggle = ({
  id: drinkId,
}: {
  id: string;
}): UseMutationResult<void, Error> => {
  const queryClient = useQueryClient();

  const { data: drink } = useDrinkQuery({ id: drinkId });
  const { data: isFavourite } = useIsFavouriteDrinkQuery({ id: drinkId });

  const key = drink ? getIsFavouriteDrinkKey({ id: drink.id }) : [];

  return useMutation(
    async () => {
      if (!drink) {
        throw new Error('Drink not loaded yet');
      }

      await (isFavourite ? remove(drink.id) : add(drink));
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(key);
        const previousValue = queryClient.getQueryData<boolean>(key);

        queryClient.setQueryData(key, !isFavourite);

        return previousValue != null ? { previousValue } : undefined;
      },
      onError: (error, vars, context) => {
        if (context) {
          queryClient.setQueryData(key, context.previousValue);
        }
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(key);
        await queryClient.invalidateQueries(getFavouriteDrinksKey());
      },
    },
  );
};
