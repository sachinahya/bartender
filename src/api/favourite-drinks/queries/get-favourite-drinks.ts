import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';
import { LocalStorageFavouritesStore } from '../store/local-storage-favourites-store';

export const {
  getKey: getFavouriteDrinksKey,
  useDataQuery: useFavouriteDrinksQuery,
  prefetchLoaderFactory: favouriteDrinksLoader,
} = generateQuery<Drink[]>({
  key: 'favouriteDrinks',
  fetcher: () => new LocalStorageFavouritesStore().getAll(),
});
