import React from "react"
import { Link } from "react-router-dom"

const RecipeTile = ({ id, name, description}) => {
  return (
    <div className="recipe-tile">
        <h2>{name}</h2>
        <Link to={`/recipes/${id}`}>
          <input 
            id="recipe-button" 
            type="button" 
            className="btn btn-primary" 
            value="See Reviews" 
          />
        </Link>
        <p>Rating: 5 Stars</p>
        <p>{description}</p>
    </div>
  )
}

export default RecipeTile
