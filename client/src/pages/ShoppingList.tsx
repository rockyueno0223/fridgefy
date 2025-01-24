import { Recipe } from "@/components/RecipeCard"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"



export const ShoppingList = () => {
    const [ingredients, setIngredients] = useState<string[]>(["A", "B", "C"])
    const [storedRecipes, setStoredRecipes] = useState<Recipe[]>([
        {
            "id": 1,
            "name": "Classic Margherita Pizza",
            "ingredients": [
                "Pizza dough",
                "Tomato sauce",
                "Fresh mozzarella cheese",
                "Fresh basil leaves",
                "Olive oil",
                "Salt and pepper to taste"
            ],
            "instructions": [
                "Preheat the oven to 475°F (245°C).",
                "Roll out the pizza dough and spread tomato sauce evenly.",
                "Top with slices of fresh mozzarella and fresh basil leaves.",
                "Drizzle with olive oil and season with salt and pepper.",
                "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
                "Slice and serve hot."
            ],
            "prepTimeMinutes": 20,
            "cookTimeMinutes": 15,
            // "servings": 4,
            // "difficulty": "Easy",
            "cuisine": "Italian",
            "caloriesPerServing": 300,
            "tags": [
                "Pizza",
                "Italian"
            ],
            "userId": 166,
            "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
            "rating": 4.6,
            "reviewCount": 98,
            "mealType": [
                "Dinner"
            ]
        },
        {
            "id": 2,
            "name": "Vegetarian Stir-Fry",
            "ingredients": [
                "Tofu, cubed",
                "Broccoli florets",
                "Carrots, sliced",
                "Bell peppers, sliced",
                "Soy sauce",
                "Ginger, minced",
                "Garlic, minced",
                "Sesame oil",
                "Cooked rice for serving"
            ],
            "instructions": [
                "In a wok, heat sesame oil over medium-high heat.",
                "Add minced ginger and garlic, sauté until fragrant.",
                "Add cubed tofu and stir-fry until golden brown.",
                "Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.",
                "Pour soy sauce over the stir-fry and toss to combine.",
                "Serve over cooked rice."
            ],
            "prepTimeMinutes": 15,
            "cookTimeMinutes": 20,
            // "servings": 3,
            // "difficulty": "Medium",
            "cuisine": "Asian",
            "caloriesPerServing": 250,
            "tags": [
                "Vegetarian",
                "Stir-fry",
                "Asian"
            ],
            "userId": 143,
            "image": "https://cdn.dummyjson.com/recipe-images/2.webp",
            "rating": 4.7,
            "reviewCount": 26,
            "mealType": [
                "Lunch"
            ]
        },
        {
            "id": 3,
            "name": "Chocolate Chip Cookies",
            "ingredients": [
                "All-purpose flour",
                "Butter, softened",
                "Brown sugar",
                "White sugar",
                "Eggs",
                "Vanilla extract",
                "Baking soda",
                "Salt",
                "Chocolate chips"
            ],
            "instructions": [
                "Preheat the oven to 350°F (175°C).",
                "In a bowl, cream together softened butter, brown sugar, and white sugar.",
                "Beat in eggs one at a time, then stir in vanilla extract.",
                "Combine flour, baking soda, and salt. Gradually add to the wet ingredients.",
                "Fold in chocolate chips.",
                "Drop rounded tablespoons of dough onto ungreased baking sheets.",
                "Bake for 10-12 minutes or until edges are golden brown.",
                "Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack."
            ],
            "prepTimeMinutes": 15,
            "cookTimeMinutes": 10,
            // "servings": 24,
            // "difficulty": "Easy",
            "cuisine": "American",
            "caloriesPerServing": 150,
            "tags": [
                "Cookies",
                "Dessert",
                "Baking"
            ],
            "userId": 34,
            "image": "https://cdn.dummyjson.com/recipe-images/3.webp",
            "rating": 4.9,
            "reviewCount": 13,
            "mealType": [
                "Snack",
                "Dessert"
            ]
        }
    ])

    useEffect(() => { }, [])


    //remove selected recipe from state "storedRecipes"
    const handleRemove = (id: number) => {
        setStoredRecipes(prevState => prevState.filter(prev => prev.id !== id))
    }

    return (
        <div className="accordion-container max-w-screen w-max">

            {storedRecipes.map((recipe) =>
                <Accordion key={recipe.id} type="single" collapsible >
                    <AccordionItem value={recipe.id.toString()}>
                        <AccordionTrigger>{recipe.name}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-5">
                                <ul className="flex flex-col gap-3">
                                    {recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                                </ul>
                                <div>
                                    <Button onClick={() => handleRemove(recipe.id)}> Remove </Button>
                                </div>
                            </div>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )
            }

            <div>
                <h2>Ingredients (test list)</h2>
                <ul>
                    {ingredients.map((ingredient) => <li>{ingredient}</li>)}
                </ul>
            </div>


        </div >
    )
}

