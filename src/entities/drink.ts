import { Palette } from './palette';

export interface Drink {
  id: string;
  name: string;
  alternateName?: string;
  tags: string[];
  category: string;
  alcoholic: string;
  glass: string;
  palette?: Palette;
  image: string;
  instructions: string[];
  ingredients: DrinkIngredient[];
}

export interface DrinkIngredient {
  name: string;
  measure: string;
}
