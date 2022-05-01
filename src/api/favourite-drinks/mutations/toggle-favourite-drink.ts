import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useDrinkQuery } from '../../cocktail-db';
import { getFavouriteDrinksKey } from '../queries/get-favourite-drinks';
import { useIsFavouriteDrinkQuery, getIsFavouriteDrinkKey } from '../queries/is-favourite-drink';
import { LocalStorageFavouritesStore } from '../store/local-storage-favourites-store';

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

      const store = new LocalStorageFavouritesStore();
      await (isFavourite ? store.remove(drink.id) : store.add(drink));
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
