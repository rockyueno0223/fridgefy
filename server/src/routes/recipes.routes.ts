import { Router } from "express";
import recipeController from "../controllers/recipe.controller";

export const recipesRouter = Router();

// /api/v1/recipes
recipesRouter.get("/", recipeController.getRecipes);
recipesRouter.get("/:id", recipeController.getRecipeById);
