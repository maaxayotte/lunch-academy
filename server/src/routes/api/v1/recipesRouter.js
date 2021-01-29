import express from "express"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
import { Recipe, User } from "../../../models/index.js"
import cleanUserInput from '../../../services/cleanUserInput.js'

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
    const serializedRecipe = RecipeSerializer.getDetails(recipe)
    serializedRecipe.reviews = await recipe.$relatedQuery("reviews")
    serializedRecipe.users = await recipe.$relatedQuery("users")
    return res.status(200).json({ recipe: serializedRecipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.get("/new", async (req, res) => {
  try {
    const recipes = await Recipe.query()
    const serializedRecipes = recipes.map(recipe => RecipeSerializer.getDetails(recipe))
    return res.status(200).json({ recipes: serializedRecipes})
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.post('/', async (req, res) => {
  const {title, difficulty, dietType, cookTime, ingredients, instructions, url} = req.body
  const formInput = cleanUserInput({ title, difficulty, dietType, cookTime, ingredients, instructions, url })
  try {
    const newRecipe = await Recipe.query().insertAndFetch(formInput)
    return res.status(201).json({ recipe: newRecipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default recipesRouter
