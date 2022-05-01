export interface Drink {
  id: string;
  name: string;
  alternateName?: string;
  tags: string[];
  category: string;
  alcoholic: string;
  glass: string;
  image: string;
  palette: {
    vibrant?: string;
    lightVibrant?: string;
    darkVibrant?: string;
    muted?: string;
    lightMuted?: string;
    darkMuted?: string;
  };
  instructions: string[];
  ingredients: DrinkIngredient[];
}

export interface DrinkIngredient {
  name: string;
  measure: string;
}
