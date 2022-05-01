import { generateQuery } from '../../../data';
import { LocalStorageFavouritesStore } from '../store/local-storage-favourites-store';

export const {
  getKey: getIsFavouriteDrinkKey,
  useDataQuery: useIsFavouriteDrinkQuery,
  useRouteMatchedDataQuery: useIsMatchedFavouriteDrinkQuery,
} = generateQuery<{ id: string }, boolean>({
  key: 'favouriteDrink',
  fetcher: ({ id }) => new LocalStorageFavouritesStore().isFavourite(id),
  getMatchParams: (routeMatch) => (routeMatch.params.id ? { id: routeMatch.params.id } : null),
});
