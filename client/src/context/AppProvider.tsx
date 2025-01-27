import { AppContext } from "@/context/AppContext";
import { IIngredient } from "@/types/ingredient";
import { IRecipe } from "@/types/recipe";
import { IUser } from "@/types/user";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const WISHLIST_KEY = "recipe-wishlist";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();
  // const {getToken} = useAuth()

  const [user, setUser] = useState<IUser | null>(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);

  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [userError, setUserError] = useState<string | null>(null);

  const [loadingRecipes, setLoadingRecipes] = useState<boolean>(false);
  const [recipesError, setRecipesError] = useState<string | null>(null);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  });

  useEffect(() => {
    if (clerkUser) {
      const fetchUser = async () => {
        try {
          setLoadingUser(true);

          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/${clerkUser.id
            }`
          );
          if (!res.ok) {
            throw new Error("User not found");
          }
          const data = await res.json();

          setUser(data);
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
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

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


  // Cart & Fridge demo
  const [cart, setCart] = useState<IIngredient[]>([])
  const [fridge, setFridge] = useState<IIngredient[]>([])
  const [fridgeInput, setFridgeInput] = useState<string>("")
  const [searchIngredientResults, setSearchIngredientResults] = useState<IIngredient[]>([])



  // Fridge Input search (input onchange={()=>handleSearch(value)} )
  const handleFridgeSearch = (value: string) => {
    setFridgeInput(_prev => value)
  }

  // Once the Fridge input value change > get results from BE
  useEffect(() => {
    const ingredientSearch = (value: string) => {
      const fetchResults = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/ingredients/search?q=${value}}`
        );
        if (!res.ok) {
          throw new Error("Recipes not found");
        }
        const data = await res.json();
        setSearchIngredientResults((_prev: any) => data)
      }
      fetchResults()
    }

    ingredientSearch(fridgeInput)
    return (setFridgeInput(_prev => ""))
  }, [fridgeInput])


  //get Ingredient by Id
  const fetchIngredientById = async (id: string): Promise<IIngredient> => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/ingredients/${id}`)
    if (!res.ok) {
      throw new Error("Ingredient not found");
    }
    return res.json();
  }

  //Update Ingredient data to Target
  const updateData = async (id: IIngredient["id"], target: string, action: "add" | "remove") => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me/${target}/${action}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        throw new Error(`Failed to ${action} ingredient -- ${target}`)
      }
      return res.ok
    } catch (error) {
      console.error(error)
      throw error
    }
  }


  // check the Unique Ingredient
  const checkIngredientIsUnique = (id: string): boolean => {
    return !cart.some(item => item.id === id) && !fridge.some(item => item.id === id);
  }

  //handle Add to Fridge
  const addToFridge = async (id: string) => {
    try {

      if (!checkIngredientIsUnique(id)) {
        alert("This ingredient is already in Fridge or Cart!");
        return;
      }

      const ingredient = await fetchIngredientById(id) //fetch Ingredient data by id
      const success = await updateData(id, "fridge", "add") // BE store ID only

      if (success) {
        setFridge((prev: IIngredient[]) => [...prev, ingredient])
      }

    } catch (error) {
      console.error(`Cannot add ingredient to Fridge-${error}`)
    }
  }

  //handle Add to Cart
  const addToCart = async (id: string) => {
    try {

      if (!checkIngredientIsUnique(id)) {
        alert("This ingredient is already in Fridge or Cart!");
        return;
      }

      const ingredient = await fetchIngredientById(id)
      const success = await updateData(id, "cart", "add")

      if (success) {
        setCart((prev: IIngredient[]) => [...prev, ingredient])
      }

    } catch (error) {
      console.error(`Cannot add ingredient to Cart-${error}`)
    }
  }

  // handle remove from Fridge
  const removeFromFridge = async (id: string) => {
    try {
      const success = await updateData(id, "fridge", "remove")
      if (success) {
        setFridge((prev: IIngredient[]) => prev.filter(item => item.id !== id))
      }

    } catch (error) {
      console.error(`Cannot remove ingredient to Fridge-${error}`)
    }
  }

  // handle remove from Cart
  const removeFromCart = async (id: string) => {
    try {
      const success = await updateData(id, "cart", "remove")
      if (success) {
        setCart((prev: IIngredient[]) => prev.filter(item => item.id !== id))
      }

    } catch (error) {
      console.error(`Cannot remove ingredient to Cart-${error}`)
    }
  }


  // >>> Move both side <<< or is this both optional?
  // 1. Fridge(rm) > Cart(add)
  // 2. Cart(rm) > Fridge(add)

  // ↑its needed for responsivenes

  // wishlist 
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (recipeId: string) => {
    setWishlist((prev) => (prev.includes(recipeId) ? prev : [...prev, recipeId]));
  };

  const removeFromWishlist = (recipeId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== recipeId));
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
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
