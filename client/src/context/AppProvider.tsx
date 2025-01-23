import { AppContext } from "@/context/AppContext";
import { IRecipe } from "@/types/recipe";
import { IUser } from "@/types/user";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();

  const [user, setUser] = useState<IUser | null>(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);

  useEffect(() => {
    if (clerkUser) {
      const fetchUser = async () => {
        try {
          // const res = await fetch(`/api/users/me`);
          // if (!res.ok) {
          //   throw new Error("User not found");
          // }
          // const data = await res.json();

          // Mock user data
          const data = {
            id: "1",
            fridge: ["1", "2", "3"],
            cart: ["4", "5", "6"],
            wishlist: ["7", "8", "9"],
            createdAt: "2021-10-01T00:00:00.000Z",
            updatedAt: "2021-10-01T00:00:00.000Z",
          };
          setUser(data);
        } catch (error) {
          console.error("Error fetching user", error);
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
        const res = await fetch("https://dummyjson.com/recipes");
        if (!res.ok) {
          throw new Error("Recipes not found");
        }
        const data = await res.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        recipes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
