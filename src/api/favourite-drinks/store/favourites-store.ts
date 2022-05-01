import { Drink } from '../../../entities';

export interface FavouritesStore {
  add(drink: Drink): Promise<void>;

  remove(id: string): Promise<void>;

  isFavourite(id: string): Promise<boolean>;

  getAll(): Promise<Drink[]>;
}
