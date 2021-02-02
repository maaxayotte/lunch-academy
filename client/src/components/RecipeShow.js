import React, { useState, useEffect } from 'react'


const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({})

  const getRecipe = async () => {
    try {
      const id = props.match.params.id
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
      </div>
    </div>

  )
}

export default RecipeShow
