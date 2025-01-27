import RecipeCard from "@/components/RecipeCard";
import Search from "@/components/Search";
import { useAppContext } from "@/context/AppContext";
import { IRecipe } from "@/types/recipe";
import { useEffect, useState } from "react";

export function Recipes() {
  const { recipes, loadingRecipes, recipesError } = useAppContext();
  const [filteredData, setFilteredData] = useState<IRecipe[]>([]);



  useEffect(() => {
    setFilteredData(recipes || []);
  }, [recipes]);

  const handleSearch = (query: string) => {
    const searchTerm = query.toLowerCase();
    if (!recipes) return;

    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        recipe.cuisine.toLowerCase().includes(searchTerm) ||
        recipe.mealType.some((type) => type.toLowerCase().includes(searchTerm))
    );
    setFilteredData(filtered);
  };

  if (loadingRecipes) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (recipesError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 text-lg">{recipesError}</div>
      </div>
    );
  }

  return (
    <div className="h-full ">
      <div className="mb-6">
        <Search onSearch={handleSearch} />
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        {filteredData.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-lg">No recipes found</p>
        </div>
      )}
    </div>
  );
}
