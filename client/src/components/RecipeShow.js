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
    const reviewDataRecipeId = { ...newReviewData, recipeId: id, userId: props.user.id }
    try {
      const response = await fetch(`/api/v1/recipes/${id}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(reviewDataRecipeId)
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
        setRecipe({ ...recipe, 
          reviews: [...recipe.reviews, body.review] })
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  let average = []
  
  const reviewTiles = recipe.reviews.map(review => {
    average.push(review.rating)
    return (
      <ReviewTile
        user={props.user}
        key={review.id}
        review={review}
        user={review.user}
      />
    )
  })

  function averageRating(average) {
    let sum = 0
    for(let i = 0; i < average.length; i++) {
      sum += average[i]
    }
    return (sum / average.length).toFixed(2)
  }

  return (
    <div className="background-runner" >
      <div className="text-center main-container">
        <h1 className="recipe-name">{recipe.name}</h1>
        <div className="grid-x grid-margin-x recipe-top">
          <div className="cell small-3">
            <span className="recipe-column-names">
              Diet Type:
            </span>
            {recipe.diet}
          </div>
          <div className="cell small-3">
            <span className="recipe-column-names">
              Cook Time:
            </span>
            {recipe.cookTime}
          </div>
          <div className="cell small-3">
            <span className="recipe-column-names">
              Recipe Difficulty:
            </span>
            {recipe.difficulty}
          </div>
          <div className="cell small-3">
            <span className="recipe-column-names">
              Average Rating:
            </span>
            {averageRating(average)}
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
          <ErrorList errors={errors} />
          <NewReviewForm postReview={postReview} />
        </div>

        <div>
          {reviewTiles}
        </div>
      </div>
    </div>
  )
}

export default RecipeShow
