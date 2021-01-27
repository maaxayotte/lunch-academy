import React, { useState, useEffect } from "react"
import RecipeTile from "./RecipeTile"


const RecipeIndex = props => {
  const [recipes, setRecipes] = useState([])

  const getRecipes = async () => {
    try{
      const response = await fetch('/api/v1/recipes')
      if(!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw(error)
      }
      const recipesBody = await response.json()
      setRecipes(recipesBody.recipes)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getRecipes()
  }, [])

  const recipeTiles = recipes.map(recipe => {
    return (
      <RecipeTile
        key={recipe.id}
        id={recipe.id}
        name={recipe.name}
        rating={recipe.rating}
        description={recipe.description}
      />
    )
  })

  return (
    <div className="row">
      <div className="small-8 small-centered columns">
        <h1>Top Rated Recipes</h1>
        {recipeTiles}
      </div>
    </div>
  )
}

export default RecipeIndex