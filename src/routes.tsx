import { Route } from '@tanstack/react-location';
import { QueryClient } from 'react-query';

import { randomDrinkLoader, randomDrinksLoader, drinkByIdLoader } from './data/drink';
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
