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
                console.log(json.recipes)
                setData(json.recipes || []);
                setFilteredData(json.recipes || []);
            } catch (error) {
                setError('Error');
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
            <div className="my-4">
                <Search onSearch={handleSearch} />
            </div>
            <div className="w-full mx-auto p-4 grid md:grid-cols-2 md:max-w-3xl max-w-md gap-2">
                {filteredData.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        {...recipe}
                    />
                ))}
            </div>
            {filteredData.length === 0 && (
                <div className="text-center text-gray-500">
                    No recipes found
                </div>
            )}
        </>
    );
}