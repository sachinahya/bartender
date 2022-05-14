import { Route } from '@tanstack/react-location';
import memoizeOne from 'memoize-one';

import { useDrinkByIdLoader, useRandomDrinkLoader, useRandomDrinksLoader } from './api/cocktail-db';
import { useFavouriteDrinksLoader } from './api/favourite-drinks';
import { Discover } from './views/discover';

export const useRoutes = memoizeOne((): Route[] => [
  {
    path: '/',
    element: <Discover />,
    loader: useRandomDrinksLoader(),
  },
  // {
  //   path: 'favourites',
  //   element: () => import('./views/favourites').then(({ Favourites }) => <Favourites />),
  //   loader: useFavouriteDrinksLoader(),
  // },
  // {
  //   path: 'drink',
  //   children: [
  //     {
  //       path: 'random',
  //       element: () => import('./views/drink').then(({ Drink }) => <Drink />),
  //       loader: useRandomDrinkLoader(),
  //     },
  //     {
  //       path: ':id',
  //       element: () => import('./views/drink').then(({ Drink }) => <Drink />),
  //       loader: useDrinkByIdLoader(),
  //     },
  //   ],
  // },
]);
