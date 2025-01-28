import { Request, Response } from "express";
import { IngredientModel } from "../models/ingredient.model";
import { RecipeModel } from "../models/recipe.model";

const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await RecipeModel.find()
      .populate({ path: "ingredients", model: IngredientModel })
      .lean()
      .exec();
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get recipes" });
  }
};

const getRecipeById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id).populate({
      path: "ingredients",
      model: IngredientModel,
    });
    if (!recipe) {
      res.status(404).json({ message: "Recipe does not exist" });
      return;
    }
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get recipe" });
  }
};

export default {
  getRecipes,
  getRecipeById,
};
