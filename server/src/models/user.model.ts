import mongoose, { Model, Schema } from "mongoose";

export interface IUser {
  userId: string;
  wishlist: mongoose.Schema.Types.ObjectId[];
  fridge: mongoose.Schema.Types.ObjectId[];
  cart: mongoose.Schema.Types.ObjectId[];
}

export interface IUserModel extends Model<IUser> {}

const UserSchema: Schema = new Schema<IUser, IUserModel>(
  {
    userId: { type: String, required: true }, //clerk information
    wishlist: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Recipe",
      default: [],
    },
    fridge: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ingredient",
      default: [],
    },
    cart: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Ingredient",
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
