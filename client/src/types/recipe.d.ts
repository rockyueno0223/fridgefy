export interface IRecipe {
  id: string;
  name: string;
  ingredients: IIngredient[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: string;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}
