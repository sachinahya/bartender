import { Drink } from '../../../entities';

import { FavouritesStore } from './favourites-store';

export class LocalStorageFavouritesStore implements FavouritesStore {
  static #key: string = 'favourite-drinks';

  add(drink: Drink): Promise<void> {
    const currentItem = localStorage.getItem(LocalStorageFavouritesStore.#key);
    const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

    drinks.push(drink);

    const newItem = JSON.stringify(drinks);
    localStorage.setItem(LocalStorageFavouritesStore.#key, newItem);

    return Promise.resolve();
  }

  remove(id: string): Promise<void> {
    const currentItem = localStorage.getItem(LocalStorageFavouritesStore.#key);
    const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

    const index = drinks.findIndex((drink) => drink.id === id);

    if (index < 0) {
      throw new Error('Cannot delete drink');
    }

    drinks.splice(index, 1);

    const newItem = JSON.stringify(drinks);
    localStorage.setItem(LocalStorageFavouritesStore.#key, newItem);

    return Promise.resolve();
  }

  isFavourite(id: string): Promise<boolean> {
    const currentItem = localStorage.getItem(LocalStorageFavouritesStore.#key);
    const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

    return Promise.resolve(drinks.some((drink) => drink.id === id));
  }

  getAll(): Promise<Drink[]> {
    const currentItem = localStorage.getItem(LocalStorageFavouritesStore.#key);
    const drinks = currentItem ? (JSON.parse(currentItem) as Drink[]) : [];

    return Promise.resolve(drinks);
  }
}
