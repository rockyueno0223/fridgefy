import { AppContext } from "@/context/AppContext";
import { IIngredient } from "@/types/ingredient";
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
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/cart/add`,
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
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/fridge/add`,
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

  // Cart & Fridge demo
  const [cart, setCart] = useState<IIngredient[]>([]);
  const [fridge, setFridge] = useState<IIngredient[]>([]);
  const [fridgeInput, setFridgeInput] = useState<string>("");
  const [searchIngredientResults, setSearchIngredientResults] = useState<
    IIngredient[]
  >([]);

  // Fridge Input search (input onchange={()=>handleSearch(value)} )
  const handleFridgeSearch = (value: string) => {
    setFridgeInput((_prev) => value);
  };

  // Once the Fridge input value change > get results from BE
  useEffect(() => {
    const ingredientSearch = (value: string) => {
      const fetchResults = async () => {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/ingredients/search?q=${value}}`
        );
        if (!res.ok) {
          throw new Error("Recipes not found");
        }
        const data = await res.json();
        setSearchIngredientResults((_prev: any) => data);
      };
      fetchResults();
    };

    ingredientSearch(fridgeInput);
    return setFridgeInput((_prev) => "");
  }, [fridgeInput]);

  //get Ingredient by Id
  const fetchIngredientById = async (id: string): Promise<IIngredient> => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/ingredients/${id}`
    );
    if (!res.ok) {
      throw new Error("Ingredient not found");
    }
    return res.json();
  };

  //Update Ingredient data to Target
  const updateData = async (
    id: IIngredient["_id"],
    target: string,
    action: "add" | "remove"
  ) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/me/${target}/${action}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to ${action} ingredient -- ${target}`);
      }
      return res.ok;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // check the Unique Ingredient
  const checkIngredientIsUnique = (id: string): boolean => {
    return (
      !cart.some((item) => item._id === id) &&
      !fridge.some((item) => item._id === id)
    );
  };

  // //handle Add to Fridge
  // const addToFridge = async (id: string) => {
  //   try {
  //     if (!checkIngredientIsUnique(id)) {
  //       alert("This ingredient is already in Fridge or Cart!");
  //       return;
  //     }

  //     const ingredient = await fetchIngredientById(id); //fetch Ingredient data by id
  //     const success = await updateData(id, "fridge", "add"); // BE store ID only

  //     if (success) {
  //       setFridge((prev: IIngredient[]) => [...prev, ingredient]);
  //     }
  //   } catch (error) {
  //     console.error(`Cannot add ingredient to Fridge-${error}`);
  //   }
  // };

  // //handle Add to Cart
  // const addToCart = async (id: string) => {
  //   try {
  //     if (!checkIngredientIsUnique(id)) {
  //       alert("This ingredient is already in Fridge or Cart!");
  //       return;
  //     }

  //     const ingredient = await fetchIngredientById(id);
  //     const success = await updateData(id, "cart", "add");

  //     if (success) {
  //       setCart((prev: IIngredient[]) => [...prev, ingredient]);
  //     }
  //   } catch (error) {
  //     console.error(`Cannot add ingredient to Cart-${error}`);
  //   }
  // };

  // // handle remove from Fridge
  // const removeFromFridge = async (id: string) => {
  //   try {
  //     const success = await updateData(id, "fridge", "remove");
  //     if (success) {
  //       setFridge((prev: IIngredient[]) =>
  //         prev.filter((item) => item.id !== id)
  //       );
  //     }
  //   } catch (error) {
  //     console.error(`Cannot remove ingredient to Fridge-${error}`);
  //   }
  // };

  // // handle remove from Cart
  // const removeFromCart = async (id: string) => {
  //   try {
  //     const success = await updateData(id, "cart", "remove");
  //     if (success) {
  //       setCart((prev: IIngredient[]) => prev.filter((item) => item.id !== id));
  //     }
  //   } catch (error) {
  //     console.error(`Cannot remove ingredient to Cart-${error}`);
  //   }
  // };

  // >>> Move both side <<< or is this both optional?
  // 1. Fridge(rm) > Cart(add)
  // 2. Cart(rm) > Fridge(add)

  // ↑its needed for responsivenes

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

        addToCart(addedRecipe[0].ingredients);
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
        // addToFridge,
        // fridge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
