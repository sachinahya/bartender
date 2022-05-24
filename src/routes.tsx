import { Route } from '@tanstack/react-location';

import {
  useDrinkByIdLoader,
  useIngredientsLoader,
  useRandomDrinkLoader,
  useRandomDrinksLoader,
} from './api/cocktail-db';
import { useFavouriteDrinksLoader } from './api/favourite-drinks';
import { combineLoaders } from './data';

export const useRoutes = (): Route[] => [
  {
    path: '/',
    element: () => import('./views/discover').then(({ Discover }) => <Discover />),
    loader: combineLoaders(
      useRandomDrinksLoader({ eager: true }),
      useIngredientsLoader({ eager: true }),
    ),
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
