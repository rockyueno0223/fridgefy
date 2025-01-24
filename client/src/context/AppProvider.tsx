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

  return (
    <AppContext.Provider
      value={{
        user,
        recipes,
        loadingUser,
        userError,
        loadingRecipes,
        recipesError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
