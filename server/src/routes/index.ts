import { Router } from "express";
import { ingredientRouter } from "./ingredient.route";
import { protectedRouter } from "./protected-routes";
import { recipesRouter } from "./recipes.routes";

export const v1router = Router();

// /api/v1/

v1router.use("/recipes", recipesRouter);

v1router.use("/users", protectedRouter);

v1router.use("/ingredients", ingredientRouter);
