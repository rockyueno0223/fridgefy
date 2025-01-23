import { Router } from "express";
import { protectedRouter } from "./protected-routes";
import { recipesRouter } from "./recipes.routes";
import { userRouter } from "./user.routes";

export const v1router = Router();

// /api/v1/

v1router.use("/recipes", recipesRouter);

v1router.use(protectedRouter);

v1router.use("/users", userRouter);
