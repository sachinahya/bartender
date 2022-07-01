import { createContext, FC, ReactNode, useContext } from 'react';

import { fetchJson } from '../data';
import { Category, Drink, DrinkListItem, Ingredient, IngredientListItem } from '../entities';

const ApiClientContext = createContext<ApiClient | undefined>(undefined);

export const ApiClientProvider: FC<{ children?: ReactNode; value: ApiClient }> = ({
  children,
  value,
}) => <ApiClientContext.Provider value={value}>{children}</ApiClientContext.Provider>;

export const useApiClient = (): ApiClient => {
  const ctx = useContext(ApiClientContext);
  if (!ctx) {
    throw new Error('No context');
  }
  return ctx;
};

export class ApiClient {
  async add(drink: Drink): Promise<void> {
    await this.#callFunction('add-favourite', { id: drink.id });
  }

  async remove(id: string): Promise<void> {
    await this.#callFunction('remove-favourite', { id });
  }

  async isFavourite(id: string): Promise<boolean> {
    const result = await this.#callFunction<{
      data: { isFavourite: boolean };
    }>('is-favourite', { id });

    return result.data.isFavourite;
  }

  getAll(): Promise<Drink[]> {
    return Promise.resolve([]);
  }

  getRandomDrinks(count: number): Promise<Drink[]> {
    return this.#callFunction('random-drinks', { count: count.toString() });
  }

  getRandomDrink(): Promise<Drink> {
    return this.#callFunction('random-drink');
  }

  getDrinkById(id: string): Promise<Drink> {
    return this.#callFunction('drink-by-id', { id });
  }

  getDrinksByIngredient(ingredientName: string): Promise<DrinkListItem[]> {
    return this.#callFunction('drinks-by-ingredient', { ingredientName });
  }

  getCategories(): Promise<Category[]> {
    return this.#callFunction('list-categories');
  }

  getIngredients(): Promise<IngredientListItem[]> {
    return this.#callFunction('list-ingredients');
  }

  getIngredientByName(name: string): Promise<Ingredient> {
    return this.#callFunction('ingredient-by-name', { name });
  }

  #callFunction<T>(functionName: string, params?: Record<string, string>) {
    const urlParams = new URLSearchParams(params).toString();

    return fetchJson<T>(
      `/.netlify/functions/${functionName}${urlParams ? '?' + urlParams : urlParams}`,
    );
  }
}
