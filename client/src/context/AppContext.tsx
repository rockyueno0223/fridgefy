import { IRecipe } from "@/types/recipe";
import { IUser } from "@/types/user";
import { createContext, useContext } from "react";

type AppContextType = {
  user: IUser | null;
  recipes: IRecipe[] | null;
  loadingUser: boolean;
  userError: string | null;
  loadingRecipes: boolean;
  recipesError: string | null;
  addToCart: (ingredientIds: string[]) => void;
  removeFromCart: (ingredientIds: string[]) => void;
  addToFridge: (ingredientIds: string[]) => void;
  removeFromFridge: (ingredientIds: string[]) => void;

  wishlist: IRecipe[];

  addToWishlist: (recipeId: string) => void;
  removeFromWishlist: (recipeId: string) => void;
  // addToFridge: (id: string) => Promise<void>;
  // fridge: IIngredient[]
  checkUniqueCart: (ingredientIds: string[]) => string[]
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
