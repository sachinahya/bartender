import { Drink } from './types';

const KEY = 'favourite-drinks';

export const add = (drink: Drink): Promise<void> => {
  const currentItem = localStorage.getItem(KEY);
  const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

  drinks.push(drink);

  const newItem = JSON.stringify(drinks);
  localStorage.setItem(KEY, newItem);

  return Promise.resolve();
};

export const getById = (id: string): Promise<Drink | undefined> => {
  const currentItem = localStorage.getItem(KEY);
  const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

  return Promise.resolve(drinks.find((drink) => drink.id === id));
};

export const getAll = (): Promise<Drink[]> => {
  const currentItem = localStorage.getItem(KEY);
  const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

  return Promise.resolve(drinks);
};
