import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { IRecipe } from "@/types/recipe";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const RecipeCard = ({
  _id,
  name,
  prepTimeMinutes,
  cookTimeMinutes,
  caloriesPerServing,
  ingredients,
  // rating,
  image,
  tags,
}: IRecipe) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useAppContext();
  const isInWishlist = wishlist.find((id) => id === _id) !== undefined;

  return (
    <Card className="w-full overflow-hidden mb-4">
      <div className="w-full h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{prepTimeMinutes + cookTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🔥</span>
            <span>{caloriesPerServing} kcal</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex justify-start items-center text-gray-500">
            Ingredients:
          </div>
          {ingredients.map((item) => (
            <Badge key={item.id} variant="secondary">
              {item.name}
            </Badge>
          ))}
        </div>
      </CardContent>

      <div className="w-full flex justify-center items-center p-2 space-x-2">
        <Link key={_id} to={`${_id}`}>
          <Button variant={"outline"} className="w-full">
            More
          </Button>
        </Link>
        <Button
          className="w-full"
          variant={isInWishlist ? "destructive" : "default"}
          onClick={() =>
            isInWishlist ? removeFromWishlist(_id) : addToWishlist(_id)
          }
        >
          {isInWishlist ? "Remove" : "Add"}
        </Button>
      </div>
    </Card>
  );
};

export default RecipeCard;
