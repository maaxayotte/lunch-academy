import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Review } from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'
import ReviewSerializer from '../../../serializers/ReviewSerializer.js'

const recipeReviewsRouter = new express.Router({ mergeParams: true })

recipeReviewsRouter.post('/', async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { rating, description } = formInput
  const { recipeId } = req.params
  try {
    const review = await Review.query().insertAndFetch({ rating, description, recipeId, userId })
    const serializedReview = await ReviewSerializer.getReviewDetails(review)
    return res.status(201).json({ review: serializedReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default recipeReviewsRouter