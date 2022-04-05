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

export interface DrinksResponse {
  drinks: DrinksResponseItem[];
}

export interface DrinksResponseItem {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  'strInstructionsZH-HANS': string | null;
  'strInstructionsZH-HANT': string | null;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
