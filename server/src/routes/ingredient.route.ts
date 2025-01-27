import { Router } from "express";
import ingredientController from "../controllers/ingredient.controller";

export const ingredientRouter = Router();

ingredientRouter.get("/", ingredientController.getIngredients);
ingredientRouter.get("/search", ingredientController.searchIngredientbyQuery);
// example : "http://localhost:3400/api/v1/ingredients/search?q=tomato"
ingredientRouter.get("/:id", ingredientController.getIngredientById);
