import { createContext, FC, ReactNode, useContext } from 'react';

import { FavouritesStore } from './favourites-store';

const FavouritesStoreContext = createContext<FavouritesStore | undefined>(undefined);

export const FavouritesStoreProvider: FC<{ children?: ReactNode; store: FavouritesStore }> = ({
  children,
  store,
}) => <FavouritesStoreContext.Provider value={store}>{children}</FavouritesStoreContext.Provider>;

export const useFavouritesStore = (): FavouritesStore => {
  const ctx = useContext(FavouritesStoreContext);
  if (!ctx) {
    throw new Error('No context');
  }
  return ctx;
};
