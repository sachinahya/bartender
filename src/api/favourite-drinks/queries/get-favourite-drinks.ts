import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';
import { useFavouritesStore } from '../store/context';
import { FavouritesStore } from '../store/favourites-store';

export const {
  getKey: getFavouriteDrinksKey,
  useDataQuery: useFavouriteDrinksQuery,
  useLoader: useFavouriteDrinksLoader,
} = generateQuery<Drink[], { store: FavouritesStore }>({
  key: 'favouriteDrinks',
  fetcher: (context) => context.meta.store.getAll(),
  useQueryContextMeta: () => ({
    store: useFavouritesStore(),
  }),
});
