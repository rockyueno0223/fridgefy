import { Request, Response } from "express";
import { IngredientModel } from "../models/ingredient.model";

// search

const searchIngredientbyQuery = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const query = req.query.q as string;
        const results = await IngredientModel.find({
            name: { $regex: query, $options: "i" },
        });
        res.json(results);
    } catch (err) {
        throw new Error(`error: cannot search ingredients from backend - ${Error}`);
    }
};

// get the Ingredient by Id
const getIngredientById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const result = await IngredientModel.findById(req.params.id);
        res.json(result);
    } catch (err) {
        throw new Error(`error: cannot get ingredient by Id - ${Error}`);
    }
};


//get ingredients
const getIngredients = async (req: Request, res: Response) => {
    try {
        const ingredients = await IngredientModel.find();
        res.json(ingredients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to get ingredients" });
    }
};

export default {
    searchIngredientbyQuery,
    getIngredientById,
    getIngredients,
};
