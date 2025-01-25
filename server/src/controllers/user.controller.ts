import { Request, Response } from "express";
import mongoose from "mongoose";
import { IngredientModel } from "../models/ingredient.model";
import { RecipeModel } from "../models/recipe.model";
import { IUser, UserModel } from "../models/user.model";

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
    res.status(500).json({ message: "Unable to remove from cart" });
  }
};

const addToFridge = async (
  req: Request<{ id: string }, {}, IUser>,
  res: Response
) => {
  try {
    const updatedFridge = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $push: { fridge: req.body } },
      { new: true }
    );

    //extra logic that prevents if its on cart do not add to fridge
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to add to fridge" });
  }
};

const removeFromFridge = async (
  req: Request<{ id: string }, {}, IUser>,
  res: Response
) => {
  try {
    const updatedFridge = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { fridge: req.body } },
      { new: true }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to remove from fridge" });
  }
};

const addToWishlist = async (
  req: Request<{ id: string }, {}, IUser>,
  res: Response
) => {
  try {
    const updatedWishlist = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $push: { wishlist: req.body } },
      { new: true }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to add to wishlist" });
  }
};

const removeFromWishlist = async (
  req: Request<{ id: string }, {}, IUser>,
  res: Response
) => {
  try {
    const updatedWishlist = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { wishlist: req.body } },
      { new: true }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to remove from wishlist" });
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
