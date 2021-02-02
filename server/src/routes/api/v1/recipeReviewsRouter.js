import express from 'express'
import { Review } from '../../../models/index.js'

const recipeReviewsRouter = new express.Router({ mergeParams: true })

recipeReviewsRouter.post('/', async (req, res) => {
  const { rating, description } = req.body
  const { recipeId } = req.mergeParams
  try {
    const newReview = await Review.query().insertAndFetch({ rating, description, recipeId })
    return res.status(201).json({ review: newReview })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default recipeReviewsRouter