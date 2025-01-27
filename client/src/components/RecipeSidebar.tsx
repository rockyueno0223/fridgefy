import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "./ui/sidebar";
import { useEffect, useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
import { useAppContext } from "@/context/AppContext";
import { IRecipe } from "@/types/recipe";

export const RecipeSidebar = () => {
  const { recipes, loadingRecipes, wishlist, removeFromWishlist } = useAppContext();
  const [wishlistItems, setWishlistItems] = useState<IRecipe[]>([]);

  useEffect(() => {
    setWishlistItems((recipes ?? []).filter((recipe) => wishlist.includes(recipe.id)));
  }, [recipes, wishlist]);
  

  return (
    <Sidebar className="z-10 mt-24" side="right">
      <SidebarHeader />
      <SidebarTrigger className="absolute left-0 top-4 -translate-x-full rotate-180" />
      <SidebarContent className="p-4">
        <SidebarGroupLabel className="text-xl">Recipes</SidebarGroupLabel>
        <SidebarGroupContent>
          {loadingRecipes ? (
            <div className="text-center py-4">Loading...</div>
          ) : wishlistItems.length > 0 ? (
            <ul className="space-y-2">
              {wishlistItems?.map((recipe) => (
                <li key={recipe.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
                  <span className="flex-1">{recipe.name}</span>
                  <button onClick={() => removeFromWishlist(recipe.id)} className="text-gray-500 hover:text-red-500 transition-colors px-2">
                    &#215;
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4 text-gray-500">Empty</div>
          )}
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="p-4 text-sm text-gray-500 text-center">
        {wishlistItems.length} items
      </SidebarFooter>
    </Sidebar>
  );
};