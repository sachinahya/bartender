import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { Drink } from '../../entities';
import { useApiClient } from '../client';
import { getFavouriteDrinksKey } from '../queries/favourite-drinks';
import { useIsFavouriteDrinkQuery, getIsFavouriteDrinkKey } from '../queries/is-favourite-drink';

export const useFavouriteDrinkToggle = ({
  drink,
}: {
  drink: Drink;
}): UseMutationResult<void, Error> => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  const { data: isFavourite } = useIsFavouriteDrinkQuery({ id: drink.id });

  const key = drink ? getIsFavouriteDrinkKey({ id: drink.id }) : [];

  return useMutation(
    async () => {
      if (!drink) {
        throw new Error('Drink not loaded yet');
      }

      await (isFavourite ? apiClient.remove(drink.id) : apiClient.add(drink));
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
        queryClient.setQueryData(key, !isFavourite);
        // await queryClient.invalidateQueries(key);
        await queryClient.invalidateQueries(getFavouriteDrinksKey());
      },
    },
  );
};
