import { Route } from '@tanstack/react-location';

import { randomDrinkLoader, randomDrinksLoader, drinkByIdLoader } from './data/drink';
import { Discover } from './views/discover';

export const routes: Route[] = [
  {
    path: '/',
    element: <Discover />,
    loader: randomDrinksLoader,
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
        loader: randomDrinkLoader,
      },
      {
        path: ':id',
        element: () => import('./views/drink').then(({ Drink }) => <Drink />),
        loader: drinkByIdLoader,
      },
    ],
  },
];
