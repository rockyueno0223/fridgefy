import mongoose, { Document, Schema } from "mongoose";

export interface IIngredient extends Document {
  name: string;
}

const IngredientSchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const IngredientModel = mongoose.model<IIngredient>(
  "Ingredient",
  IngredientSchema
);
