import { AppContext } from "@/context/AppContext";
import { IRecipe } from "@/types/recipe";
import { IUser } from "@/types/user";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();

  const { getToken } = useAuth();

  const [user, setUser] = useState<IUser | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);

  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [userError, setUserError] = useState<string | null>(null);

  const [loadingRecipes, setLoadingRecipes] = useState<boolean>(false);
  const [recipesError, setRecipesError] = useState<string | null>(null);

  const [wishlist, setWishlist] = useState<IUser["wishlist"]>([]);

  useEffect(() => {
    if (clerkUser) {
      const fetchUser = async () => {
        try {
          setLoadingUser(true);

          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`,
            {
              headers: {
                Authorization: `Bearer ${await getToken()}`,
              },
            }
          );
          if (!res.ok) {
            throw new Error("User not found");
          }
          const data = await res.json();

          setUser(data);
          setWishlist(data.wishlist);
          setUserError(null);
        } catch (error) {
          console.error("Error fetching user", error);
          setUserError((error as Error).message);
        } finally {
          setLoadingUser(false);
        }
      };
      fetchUser();
    } else {
      setUser(null);
    }
  }, [clerkUser]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoadingRecipes(true);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes`
        );
        if (!res.ok) {
          throw new Error("Recipes not found");
        }
        const data = await res.json();
        setRecipes(data);
        setRecipesError(null);
      } catch (error) {
        console.error("Error fetching recipes", error);
        setRecipesError((error as Error).message);
      } finally {
        setLoadingRecipes(false);
      }
    };
    fetchRecipes();
  }, []);

  const addToCart = async (ingredientIds: string[]) => {
    const checkedIds = checkUniqueCart(ingredientIds)
    if (checkedIds.length === 0) {
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/cart/add`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredientIds: checkedIds }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            cart: data.cart,
          };
        });
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error adding ingredient to cart", error);
    }
  };

  const removeFromCart = async (ingredientIds: string[]) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/cart/remove`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredientIds }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            cart: data.cart,
          };
        });
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error removing ingredient from cart", error);
    }
  };

  const addToFridge = async (ingredientIds: string[]) => {
    const checkedIds = checkUniqueFridge(ingredientIds)
    if (checkedIds.length === 0) {
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/fridge/add`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredientIds: checkedIds }),
        }
      );
      const data = await res.json();
      console.log("data", data);

      if (data.success) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            fridge: data.fridge,
          };
        });
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(`Cannot add ingredient to Fridge-${error}`);
    }
  };

  const removeFromFridge = async (ingredientIds: string[]) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/fridge/remove`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredientIds }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            fridge: data.fridge,
          };
        });
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(`Cannot remove ingredient to Fridge-${error}`);
    }
  };


  const checkUniqueFridge = (ingredientIds: string[]): string[] => {
    if (!user) {
      console.log(`error: sth went wrong on check unique ingredients.`)
      return []
    }
    const ids = ingredientIds.filter((ingredientId) =>
      !user.fridge.some((item) => item._id === ingredientId)
    )
    return (
      ids
    );
  };


  const checkUniqueCart = (ingredientIds: string[]): string[] => {
    if (!user) {
      console.log(`error: sth went wrong on check unique ingredients.`)
      return []
    }
    const ids = ingredientIds.filter((ingredientId) =>
      !user.cart.some((item) => item._id === ingredientId))
    return (
      ids
    );
  };


  // wishlist
  // Add to wishlist
  const addToWishlist = async (recipeId: string) => {
    if (user?.wishlist.some((reicpe) => reicpe._id === recipeId)) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3400/api/v1/users/me/wishlist/add`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredientId: recipeId }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setWishlist(() => data.wishlist);

        const addedRecipe = data.wishlist.filter(
          (recipe: IRecipe) => recipe._id === recipeId
        );

        const itemsNoneDupliclatetoFridge = checkUniqueFridge(addedRecipe[0].ingredients)
        addToCart(itemsNoneDupliclatetoFridge);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist", error);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (recipeId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/wishlist/remove`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredientId: recipeId }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist);

        const removedRecipe = wishlist.filter(
          (recipe: IRecipe) => recipe._id === recipeId
        );

        if (removedRecipe) removeFromCart(removedRecipe[0].ingredients);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error removing from wishlist", error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        user,
        recipes,
        loadingUser,
        userError,
        loadingRecipes,
        recipesError,
        addToFridge,
        removeFromFridge,
        addToCart,
        removeFromCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        checkUniqueCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
