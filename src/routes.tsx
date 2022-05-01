import { Route } from '@tanstack/react-location';
import { QueryClient } from 'react-query';

import { randomDrinksLoader, randomDrinkLoader, drinkByIdLoader } from './api/cocktail-db';
import { favouriteDrinksLoader } from './api/favourite-drinks';
import { Discover } from './views/discover';

export const createRoutes = (queryClient: QueryClient): Route[] => [
  {
    path: '/',
    element: <Discover />,
    loader: randomDrinksLoader(queryClient),
  },
  {
    path: 'favourites',
    element: () => import('./views/favourites').then(({ Favourites }) => <Favourites />),
    loader: favouriteDrinksLoader(queryClient),
  },
  {
    path: 'drink',
    children: [
      {
        path: 'random',
        element: () => import('./views/drink').then(({ Drink }) => <Drink />),
        loader: randomDrinkLoader(queryClient),
      },
      {
        path: ':id',
        element: () => import('./views/drink').then(({ Drink }) => <Drink />),
        loader: drinkByIdLoader(queryClient),
      },
    ],
  },
];
