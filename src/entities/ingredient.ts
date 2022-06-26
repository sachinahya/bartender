import { Palette } from './palette';

export interface Ingredient {
  name: string;
  palette?: Palette;
  images: {
    100: string;
    350: string;
    700: string;
  };
}
