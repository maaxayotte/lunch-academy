import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ReviewTile from './ReviewTile'
import NewReviewForm from './NewReviewForm'
import ErrorList from './ErrorList'
import translateServerErrors from '../services/translateServerErrors.js'

const RecipeShow = (props) => {
  const [errors, setErrors] = useState([])
  const [recipe, setRecipe] = useState({
    reviews: []
  })
  
  const { id } = useParams()

  const getRecipe = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw (error)
      }
      const recipesBody = await response.json()
      setRecipe(recipesBody.recipe)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getRecipe()
  }, [])

  const postReview = async (newReviewData) => {
    try {
      const response = await fetch(`/api/v1/recipes/${id}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newReviewData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      } else {
        const body = await response.json()
        const updatedReviews = recipe.reviews.concat(body.review)
        setRecipe({ ...recipe, reviews: updatedReviews })
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const reviewTiles = recipe.reviews.map(review => {
    return (
      <ReviewTile
        user={props.user}
        key={review.id}
        review={review}
      />
    )
  })

  return (
    <div className="background-runner" >
      <div className="text-center main-container">
        <h1 className="recipe-name">{recipe.name}</h1>
        <div className="grid-x grid-margin-x recipe-top">
          <div className="cell small-4">
            <span className="recipe-column-names">
              Diet Type:
            </span>
            {recipe.diet}
          </div>
          <div className="cell small-4">
            <span className="recipe-column-names">
              Cook Time:
            </span>
            {recipe.cookTime}
          </div>
          <div className="cell small-4">
            <span className="recipe-column-names">
              Recipe Difficulty:
            </span>
            {recipe.difficulty}
          </div>
        </div>

        <div className="ingredient-instructions">
          <div>
            <div className="recipe-column-names ingrdt-instrcs-title">
              Ingredients:
            </div>
            {recipe.ingredients}
          </div>
          <div className="instructions-div">
            <div className="recipe-column-names ingrdt-instrcs-title">
              Cooking Instructions:
          </div>
            {recipe.instructions}
          </div>
        </div>

        <div>
          <ErrorList errors={errors}/>
          <NewReviewForm postReview={postReview}/>
        </div>

        <div>
          {reviewTiles}
        </div>
      </div>
    </div>
  )
}

export default RecipeShow
