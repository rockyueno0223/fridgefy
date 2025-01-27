import { Request, Response } from "express";
import mongoose from "mongoose";
import { IngredientModel } from "../models/ingredient.model";
import { RecipeModel } from "../models/recipe.model";
import { UserModel } from "../models/user.model";
import { AuthObject } from "@clerk/express";

declare global {
  namespace Express {
    interface Request {
      auth: AuthObject;
    }
  }
}

const getUserPopulated = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ userId: req.auth.userId })
      .populate({ path: "cart", model: IngredientModel })
      .populate({ path: "fridge", model: IngredientModel })
      .populate({ path: "wishlist", model: RecipeModel })
      .lean()
      .exec();
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

const addToCart = async (
  req: Request<{}, {}, { ingredientIds: mongoose.Types.ObjectId[] }>,
  res: Response
) => {
  const ingredientIds = req.body.ingredientIds;
  try {
    const user = await UserModel.findOneAndUpdate(
      { userId: req.auth.userId },
      { $push: { cart: { $each: ingredientIds } } },
      { new: true }
    ).populate({ path: "cart", model: IngredientModel });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(201).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Unable to add to cart" });
  }
};

const removeFromCart = async (
  req: Request<{}, {}, { ingredientIds: mongoose.Types.ObjectId[] }>,
  res: Response
) => {
  const ingredientIds = req.body.ingredientIds;
  try {
    const user = await UserModel.findOneAndUpdate(
      { userId: req.auth.userId },
      { $pull: { cart: { $in: ingredientIds } } },
      { new: true }
    ).populate({ path: "cart", model: IngredientModel });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Unable to remove from cart" });
  }
};

const addToFridge = async (
  req: Request<{}, {}, { ingredientIds: mongoose.Types.ObjectId[] }>,
  res: Response
) => {
  const ingredientIds = req.body.ingredientIds;
  try {
    const user = await UserModel.findOneAndUpdate(
      { userId: req.auth.userId },
      { $push: { fridge: { $each: ingredientIds } } },
      { new: true }
    ).populate({ path: "fridge", model: IngredientModel });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(201).json({ success: true, fridge: user.fridge });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Unable to add to fridge" });
  }
};

const removeFromFridge = async (
  req: Request<{}, {}, { ingredientIds: mongoose.Types.ObjectId[] }>,
  res: Response
) => {
  const ingredientIds = req.body.ingredientIds;
  try {
    const user = await UserModel.findOneAndUpdate(
      { userId: req.auth.userId },
      { $pull: { fridge: { $in: ingredientIds } } },
      { new: true }
    ).populate({ path: "fridge", model: IngredientModel });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({ success: true, fridge: user.fridge });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Unable to remove from fridge" });
  }
};

const addToWishlist = async (
  req: Request<{}, {}, { ingredientId: mongoose.Types.ObjectId }>,
  res: Response
) => {
  const ingredientId = req.body.ingredientId;
  console.log(ingredientId, req.auth.userId, );
  
  try {
    const user = await UserModel.findOneAndUpdate(
      { userId: req.auth.userId },
      { $push: { wishlist: ingredientId } },
      { new: true }
    ).populate({ path: "wishlist", model: RecipeModel });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(201).json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Unable to add to wishlist" });
  }
};

const removeFromWishlist = async (
  req: Request<{}, {}, { ingredientId: mongoose.Types.ObjectId }>,
  res: Response
) => {
  const ingredientId = req.body.ingredientId;
  try {
    const user = await UserModel.findOneAndUpdate(
      { userId: req.auth.userId },
      { $pull: { wishlist: ingredientId } },
      { new: true }
    ).populate({ path: "wishlist", model: RecipeModel });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Unable to remove from wishlist" });
  }
};

export default {
  getUserPopulated,
  addToCart,
  removeFromCart,
  addToFridge,
  removeFromFridge,
  addToWishlist,
  removeFromWishlist,
};
