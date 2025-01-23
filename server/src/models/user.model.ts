import mongoose, { Document, Schema } from "mongoose";

export interface IUSer extends Document {
  userId: string;
  wishlist: string[];
  fridge: string[];
  cart: string[];
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true }, //clerk information
    wishlist: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Recipes",
      default: [],
    },
    fridge: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ingredients",
      default: [],
    },
    cart: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ingredients",
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = mongoose.model<IUSer>("User", UserSchema);
