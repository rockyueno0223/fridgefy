import console from "console";
import "dotenv/config";
import mongoose, { Types } from "mongoose";
import { IIngredient, IngredientModel } from "../models/ingredient.model";
import { RecipeModel } from "../models/recipe.model";
import { RecipeAPIType, RecipeType } from "../types/recipe.types";

const MONGO_URI = process.env.DATABASE_URI!;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
} satisfies mongoose.ConnectOptions;

export const initDB = async () => {
  if (!MONGO_URI) {
    throw new Error("Mongodb uri missing");
  }

  await mongoose.connect(MONGO_URI, { dbName: "fridgefy" });
};

const fetchRecipes = async (): Promise<RecipeAPIType> => {
  const res = await fetch("https://dummyjson.com/recipes?limit=50");

  if (!res.ok) {
    throw new Error("cannot fetch data");
  }
  return res.json();
};

export const getIngredientsFromRecipes = (
  recipes: RecipeType[]
): { name: string }[] => {
  const unflattenedIngredients = recipes.map((recipe) => recipe.ingredients);
  const ingredientsFlattened = unflattenedIngredients.flat();
  const uniqueIngredients = [...new Set(ingredientsFlattened)];
  return uniqueIngredients.map((ingredient) => ({ name: ingredient }));
};

export const mapRecipesToMatchSchema = (
  recipes: RecipeType[],
  ingredientDocs: IIngredient[]
): (Omit<RecipeType, "ingredients"> & { ingredients: Types.ObjectId[] })[] => {
  return recipes.map((recipe) => {
    return {
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) => {
        const doc = ingredientDocs.find((doc) => doc.name === ingredient);

        return doc?._id as Types.ObjectId;
      }),
    };
  });
};

//run command
const run = async () => {
  console.log("Run started");
  //fetch all recipes
  const data = await fetchRecipes();

  //collect ingredients
  const ingredients = getIngredientsFromRecipes(data.recipes);

  //adding ingredients and recipes to mongodb
  try {
    await initDB();
    console.log("Connected to DB");
    await IngredientModel.deleteMany();
    console.log("Deleted past files");

    const ingredientDocs = await IngredientModel.insertMany(ingredients);
    console.log("Inserted ingredients to DB");

    // update recipes data to match the recipe schema
    const updatedRecipes = mapRecipesToMatchSchema(
      data.recipes,
      ingredientDocs
    );
    console.log("1st MApped recipes", updatedRecipes[0]);

    await RecipeModel.deleteMany();
    const recipeDocs = await RecipeModel.insertMany(updatedRecipes);

    console.log(`recipes inserted to db, ${recipeDocs[0]}`);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

run();
