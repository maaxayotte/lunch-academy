import express from 'express'
import { Review } from '../../../models/index.js'
import objection from 'objection'
const { ValidationError } = objection
import cleanUserInput from '../../../services/cleanUserInput.js'

const recipeReviewsRouter = new express.Router({ mergeParams: true })

recipeReviewsRouter.post('/', async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { rating, description } = formInput
  const { recipeId } = req.params
  // debugger
  try {
    const review = await Review.query().insertAndFetch({ rating, description, recipeId })
    return res.status(201).json({ review })
  } catch (error) {
    if (error instanceof ValidationError) {
      // debugger
      return res.status(422).json({ errors: error.data })
    }
    // debugger
    return res.status(500).json({ errors: error })
  }
})

export default recipeReviewsRouter