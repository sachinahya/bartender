import { Palette } from './palette';

export interface DrinkListItem {
  id: string;
  name: string;
  image: string;
  palette?: Palette;
}

export interface Drink extends DrinkListItem {
  alternateName?: string;
  tags: string[];
  category: string;
  alcoholic: string;
  glass: string;

  instructions: string[];
  ingredients: DrinkIngredient[];
}

export interface DrinkIngredient {
  name: string;
  measure: string;
}
