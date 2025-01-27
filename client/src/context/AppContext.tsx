import { IIngredient } from "@/types/ingredient";
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
  wishlist: string[];
  addToWishlist: (recipeId: string) => void;
  removeFromWishlist: (recipeId: string) => void;
  addToFridge: (id: string) => Promise<void>;
  fridge: IIngredient[]
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
