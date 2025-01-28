import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IRecipe } from "@/types/recipe";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";

export default function Recipe() {
  const [recipe, setRecipe] = useState<IRecipe>();
  const { recipeId } = useParams<Params>();
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/${recipeId}`
      );
      const data = await res.json();
      setRecipe(data);
    };
    getRecipe();
  }, []);

  if (!recipe) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" m-auto p-10 w-screen">
      <div className="max-w-[500px] mx-auto">
        <Card className="w-full overflow-hidden mb-4">
          <div className="w-full h-48">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          </div>

          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-xl font-bold">{recipe.name}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-3 grid-rows-2 gap-1 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                </span>
              </div>
              <div className="flex items-center gap-2">
                Servings:
                <span>{recipe.servings}</span>
              </div>
              <div className="flex items-center gap-2">
                Difficulty:
                <span>{recipe.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">🔥</span>
                <span>{recipe.caloriesPerServing} kcal</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex justify-start items-center text-gray-500">
                Ingredients:
              </div>
              {recipe.ingredients.map((item) => (
                <Badge key={item.id} variant="secondary">
                  {item.name}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex justify-start items-center text-black font-bold">
                Intructions:
              </div>
              <ol className="list-decimal pl-6 text-gray-700 space-y-3">
                {recipe.instructions.map((instruction) => (
                  <li>{instruction}</li>
                ))}
              </ol>
            </div>
          </CardContent>
          <div className="w-full flex justify-end mb-5 px-5">
            <Button
              className="text-center"
              variant={"default"}
              onClick={() => navigate(-1)}
            >
              Back to Recipes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
