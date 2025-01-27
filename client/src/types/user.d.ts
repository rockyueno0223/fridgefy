import { IRecipe } from "./recipe";

export interface IUser {
  id: string;
  fridge: string[];
  cart: string[];
  wishlist: IRecipe[];
  createdAt: string;
  updatedAt: string;
}
