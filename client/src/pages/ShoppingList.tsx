import { useAppContext } from "@/context/AppContext";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Define the IIngredient interface
export interface IIngredient {
    id: string;
    name: string;
}

// Define the IRecipe interface
export interface IRecipe {
    _id: string;
    name: string;
    ingredients: IIngredient[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: string;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
}

export const ShoppingList = () => {
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const { wishlist, loadingRecipes, recipesError, removeFromWishlist  } = useAppContext();

    // Use recipes from context
    const storedRecipes = wishlist as IRecipe[];

    useEffect(() => {
        // Combine all ingredients from storedRecipes into a single array
        const newArray: IIngredient[] = [];
        storedRecipes?.forEach((recipe: IRecipe) => {
            recipe.ingredients.forEach((ingredient: IIngredient) => {
                newArray.push(ingredient);
            });
        });

        setIngredients(newArray);
    }, [storedRecipes]);

    // Remove a recipe from the list
    const handleRemove = (_id: string) => {
        // Update the recipes state in the context (assuming you have a function to do this)
        console.log("Remove recipe with ID:", _id);
    };

    if (loadingRecipes) {
        return <div>Loading recipes...</div>;
    }

    if (recipesError) {
        return <div>Error loading recipes: {recipesError}</div>;
    }

    return (
        <div className="accordion-container max-w-screen w-screen px-16 pt-10 md:w-max">
            <h1 className="font-bold pb-5 text-xl">My Recipes</h1>

            {storedRecipes?.map((recipe) => (
                <Accordion key={recipe._id} type="single" collapsible>
                    <AccordionItem value={recipe._id}>
                        <AccordionTrigger>{recipe.name}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-5">
                                <ul className="flex flex-col gap-3">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={`${recipe._id}-${index}`}>{ingredient.name}</li>
                                    ))}
                                </ul>
                                <div>
                                    <Button
                                        onClick={()=>removeFromWishlist(recipe._id)}
                                        aria-label={`Remove ${recipe.name} from the list`}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}

            {/* Optional: Display combined ingredients */}
            {/* <div>
                <h2>All Ingredients</h2>
                <ul>
                    {ingredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};