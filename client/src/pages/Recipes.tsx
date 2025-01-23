import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/components/RecipeCard";
import Search from "@/components/Search";

interface RecipesResponse {
  recipes: Recipe[];
}

export function Recipes() {
  const [data, setData] = useState<Recipe[]>([]);
  const [filteredData, setFilteredData] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dummyjson.com/recipes');
        const json = await response.json() as RecipesResponse;
        setData(json.recipes || []);
        setFilteredData(json.recipes || []);
      } catch (error) {
        setError('Error fetching recipes');
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const searchTerm = query.toLowerCase();
    const filtered = data.filter((recipe) => 
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      recipe.cuisine.toLowerCase().includes(searchTerm) ||
      recipe.mealType.some(type => type.toLowerCase().includes(searchTerm))
    );
    setFilteredData(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 text-lg">{error}</div>
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
          <RecipeCard
            key={recipe.id}
            {...recipe}
          />
        ))}
      </div>
      
      {filteredData.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-lg">
            No recipes found
          </p>
        </div>
      )}
    </div>
  );
}