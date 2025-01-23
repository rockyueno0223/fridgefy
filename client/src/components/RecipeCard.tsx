import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star } from 'lucide-react';


export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

const RecipeCard = ({
  name,
  prepTimeMinutes,
  cookTimeMinutes,
  caloriesPerServing,
  ingredients,
  rating,
  image,
  tags,
}:Recipe) => {
  return (
    <Card className="w-full max-w-md overflow-hidden mb-4">
      <div className="relative w-full h-48">
        <img
          src={image || "/api/placeholder/400/320"}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90">
            <Star className="w-4 h-4 mr-1 text-yellow-400 inline" />
            {rating}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
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
        <div className="flex justify-start items-center text-gray-500">Ingredients: </div>
          {ingredients.map(item => (
            <Badge key={item} variant="secondary">
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
      <div className = "w-full flex justify-center items-center p-2 space-x-2">
        <Button
      variant={'outline'}
      className='w-full'
      >More</Button>
        <Button
        className='w-full'
        >Add</Button>
      </div>
    </Card>
  );
};

export default RecipeCard;