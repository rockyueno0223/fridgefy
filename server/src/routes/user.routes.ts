import { Router } from "express";
import userController from "../controllers/user.controller";

export const userRouter = Router();

// /api/v1/users

userRouter.get("/me", userController.getUserById);

userRouter.patch("/me/cart/add", userController.addToCart);
userRouter.patch("/me/cart/remove", userController.removeFromCart);
userRouter.patch("/me/fridge/add", userController.addToFridge);
userRouter.patch("/me/fridge/remove", userController.removeFromFridge);
userRouter.patch("/me/wishlist/add", userController.addToWishlist);
userRouter.patch("/me/wishlist/remove", userController.removeFromWishlist);
