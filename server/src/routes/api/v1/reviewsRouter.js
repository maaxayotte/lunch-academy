// import express from 'express'
// import { Recipe } from '../../../models/index.js'

// const reviewsRouter = new express.Router()

// reviewsRouter.get("/:id", async(req, res) => {
//   const id = req.params.id
//   try {
//     const recipe = await Recipe.query().findById(id)
//     recipe.reviews = await recipe.$relatedQuery("reviews")
//     for (let i = 0; i < recipe.reviews.length; i++) {
//       recipe.reviews[i].user = await recipe.reviews[i].$relatedQuery("user")
//     }
//     return res.status(200).json({ reviews: recipe.reviews })
//   } catch (error) {
//     return res.status(500).json({ errors: error })
//   }
// })

// export default reviewsRouter