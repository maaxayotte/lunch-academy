import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStoreAltSlash } from '@fortawesome/free-solid-svg-icons'

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
        setRecipe({ ...recipe, 
          reviews: [...recipe.reviews, body.review] })
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  let average = []
  const reviewTiles = recipe.reviews.reverse().map(review => {
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

  let newReviewForm = () => {
    if (props.user !== null) {
      return (
        <NewReviewForm postReview={postReview} />
      )
    }
  }

  let leaveReview = 'Sign in to Leave a Review!'
  if (props.user !== null) {
    leaveReview = 'Leave a Review'
  }
  
  const averageRating =(arr) => {
    let sum = 0
    for(let i = 0; i < arr.length; i++) {
      sum += arr[i]
    }
    return (sum / arr.length).toFixed(0)
  }
  let starTile = <FontAwesomeIcon id='star' icon={faStar} />

  let stars = (aver) => {
    if (aver == 5) {
      return <span>{starTile} {starTile} {starTile} {starTile} {starTile}</span>
    } else if (aver == 4) {
      return <span>{starTile} {starTile} {starTile} {starTile}</span>
    } else if (aver == 3) {
      return <span>{starTile} {starTile} {starTile}</span>
    } else if (aver == 2) {
      return <span>{starTile} {starTile}</span>
    } else return <span>{starTile}</span>
  }
  
  let starCount = averageRating(average)

  return (
    <div className="background-runner" >
      <div className="text-center main-container">
        <h1 className="recipe-name">{recipe.name}</h1>
        <div className="grid-x grid-margin-x recipe-top">
          <div className="cell small-4">
            <span className="recipe-column-names">
              Diet:
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
              Difficulty:
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
        <hr/>
        <div>
          <div className='review-title-container'>
            <h2 className="rec-title review-title">{leaveReview}
            </h2>
            <h2 className="rec-title review-title">Avg Rating: {stars(starCount)}
            </h2>
          </div>
          <ErrorList errors={errors} />
          {newReviewForm()}
        </div>
        <div>
          {reviewTiles}
        </div>
      </div>
    </div>
  )
}

export default RecipeShow