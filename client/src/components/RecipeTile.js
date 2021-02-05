import React from "react"
import { Link } from "react-router-dom"

const RecipeTile = ({ recipe }) => {
  const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz6AeD8k5zdQ2C8QscZtPKLqGJ5IBw8bYesg&usqp=CAU'

  const instructions = recipe.instructions.substring(0,100)

  return (
    <div className="rec-tile-container">
      <div className="recipe" >
        <div className="rec-img">
          <img src={img} />
        </div>
        <div className="rec-details">
          <h2 className="rec-title">{recipe.name}</h2>
          <p className="rec-text">{recipe.description}</p>
          <p className="rec-text">{instructions}...</p>
          <ul className="rec-info">
            <li>
              Diet Type:
              <strong>{recipe.diet}</strong>
            </li>
            <li>
              Cook Time: 
            <strong> {recipe.cookTime}</strong>
            </li>
            <li>
              Difficulty: 
              <strong> {recipe.cookTime}</strong>
            </li>
          </ul>
          <Link to={`/recipes/${recipe.id}`}>
            <input 
              id="recipe-button" 
              type="button" 
              className="btn btn-primary rec-btn" 
              value='View Recipe'
              />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeTile
