import React from "react"
import { Link } from "react-router-dom"

const RecipeTile = ({ recipe }) => {
  let img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz6AeD8k5zdQ2C8QscZtPKLqGJ5IBw8bYesg&usqp=CAU'

  const instructions = recipe.instructions.substring(0,100)

  if (recipe.url !== null) {
    img = recipe.url
  }

  return (
    <div className="rec-tile-container">
      <Link to={`/recipes/${recipe.id}`}>
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
              <strong> {recipe.difficulty}</strong>
            </li>
          </ul>
        
            <input 
              id="recipe-button" 
              type="button" 
              className="btn btn-primary rec-btn" 
              value='View Recipe'
              />
        </div>
      </div>
      </Link>
    </div>
  )
}

export default RecipeTile
