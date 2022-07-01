import { Palette } from './palette';

export interface IngredientListItem {
  name: string;
  palette?: Palette;
  images: {
    100: string;
    350: string;
    700: string;
  };
}

export interface Ingredient extends IngredientListItem {
  id: string;
  description: string;
  type: string;
  alcoholic: string;
  abv?: string;
}
