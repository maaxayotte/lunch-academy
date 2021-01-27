import express from "express"
import RecipeIndexSerializer from "../../../serializers/RecipeSerializer.js"

import { Recipe } from "../../../models/index.js"

const recipesRouter = express.Router()

recipesRouter.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.query()
    const serializedRecipes = recipes.map(recipe => RecipeIndexSerializer.getDetails(recipe))
    return res.status(200).json({ recipes: serializedRecipes})
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter

