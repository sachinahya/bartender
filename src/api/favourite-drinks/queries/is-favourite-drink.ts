import { generateQuery } from '../../../data';
import { useFavouritesStore } from '../store/context';
import { FavouritesStore } from '../store/favourites-store';

export const {
  getKey: getIsFavouriteDrinkKey,
  useDataQuery: useIsFavouriteDrinkQuery,
  useRouteMatchedDataQuery: useIsMatchedFavouriteDrinkQuery,
} = generateQuery<{ id: string }, boolean, { store: FavouritesStore }>({
  key: 'favouriteDrink',
  fetcher: ({ id }, context) => context.meta.store.isFavourite(id),
  getMatchParams: (routeMatch) => (routeMatch.params.id ? { id: routeMatch.params.id } : null),
  useQueryContextMeta: () => ({
    store: useFavouritesStore(),
  }),
});
