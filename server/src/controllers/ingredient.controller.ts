import { Request, Response } from "express";
import { IngredientModel } from "../models/ingredient.model";


// search
const searchIngredientbyQuery = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.q as string
        const results = await IngredientModel.find({ name: { $regex: query, $options: 'i' } })
        res.json(results)
    } catch (err) {
        throw new Error(`error: cannot search ingredients from backend${Error}`)
    }
}





export default {
    searchIngredientbyQuery
}
