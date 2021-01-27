import express from "express"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"

import { Recipe } from "../../../models/index.js"

const recipesRouter = express.Router()

recipesRouter.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.query()
    const serializedRecipes = recipes.map(recipe => RecipeSerializer.getDetails(recipe))
    return res.status(200).json({ recipes: serializedRecipes})
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const recipe = await Recipe.query().findById(id)
    
    return res.status(200).json({ recipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter

