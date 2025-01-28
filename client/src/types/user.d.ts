import { IIngredient } from "./ingredient";
import { IRecipe } from "./recipe";

export interface IUser {
  id: string;
  fridge: IIngredient[];
  cart: IIngredient[];
  wishlist: IRecipe[];
  createdAt: string;
  updatedAt: string;
}
