import express from 'express'
import RecipeSerializer from '../../../serializers/RecipeSerializer.js'
import cleanUserInput from '../../../services/cleanUserInput.js'
import { Recipe } from '../../../models/index.js'

const recipesRouter = express.Router()

recipesRouter.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.query()
    const serializedRecipes = recipes.map(recipe => RecipeSerializer.getDetails(recipe))
    return res.status(200).json({ recipes: serializedRecipes})
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.get('/new', async (req, res) => {
  try {
    const recipes = await Recipe.query()
    const serializedRecipes = recipes.map(recipe => RecipeSerializer.getDetails(recipe))
    return res.status(200).json({ recipes: serializedRecipes})
  } catch(error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.post('/new', async (req, res) => {
  const { body } = req
  const cleanedFormData = cleanUserInput(body)

  try {
    const newRecipe = await Recipe.query().insertAndFetch(cleanedFormData)
    return res.status(201).json({ recipe: newRecipe })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

recipesRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const recipe = await Recipe.query().findById(id)
    const serializedRecipe = RecipeSerializer.getDetails(recipe)
    return res.status(200).json({ recipe: serializedRecipe })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})


export default recipesRouter
