import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  ingredients: mongoose.Schema.Types.ObjectId[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

// defined the mongoose schema based on the type above
const RecipeSchema: Schema = new Schema<IRecipe, Model<IRecipe>>(
  {
    id: Number,
    name: { type: String, required: true },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        default: [],
      },
    ],
    instructions: { type: [String], required: true },
    prepTimeMinutes: { type: Number, required: true },
    cookTimeMinutes: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, required: true },
    cuisine: { type: String, required: true },
    caloriesPerServing: { type: Number, required: true },
    tags: { type: [String], required: true },
    userId: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    mealType: { type: [String], required: true },
  },
  { timestamps: true, versionKey: false }
);

export const RecipeModel = mongoose.model<IRecipe>("Recipe", RecipeSchema);
