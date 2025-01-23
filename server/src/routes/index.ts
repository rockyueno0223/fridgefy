import { Router } from "express";
import { recipesRouter } from "./recipes.routes";
import { userRouter } from "./user.routes";

export const v1router = Router();

// /api/v1/
v1router.use("/recipes", recipesRouter);
v1router.use("/users", userRouter);
