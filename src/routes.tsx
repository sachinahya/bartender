import { Route } from '@tanstack/react-location';

import { useDrinkByIdLoader, useRandomDrinkLoader } from './api/cocktail-db';
import { useFavouriteDrinksLoader } from './api/favourite-drinks';
import { Discover } from './views/discover';

export const useRoutes = (): Route[] => [
  {
    path: '/',
    element: <Discover />,
    // loader: useRandomDrinksLoader(),
  },
  {
    path: 'favourites',
    element: () => import('./views/favourites').then(({ Favourites }) => <Favourites />),
    loader: useFavouriteDrinksLoader(),
  },
  {
    path: 'drink',
    children: [
      {
        path: 'random',
        element: () => import('./views/drink').then(({ Drink }) => <Drink />),
        loader: useRandomDrinkLoader(),
      },
      {
        path: ':id',
        element: () => import('./views/drink').then(({ Drink }) => <Drink />),
        loader: useDrinkByIdLoader(),
      },
    ],
  },
];
