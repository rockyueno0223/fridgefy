import { Router } from "express";
import { recipesRouter } from "./recipes.routes";

export const v1router = Router();

// /api/v1/recipes
v1router.use("/recipes", recipesRouter);
