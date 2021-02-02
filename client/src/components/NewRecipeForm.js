import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import ErrorList from './ErrorList.js'
import translateSeverErrors from './../services/translateServerErrors.js'

const NewRecipeForm = (props) => {

  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [newRecipeId, setNewRecipeId] = useState([])
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    difficulty: '',
    cookTime: '',
    diet: '',
    description: '',
    ingredients: '',
    instructions: '',
    url: ''
  })

  const addNewRecipe = async () => {
    try {
      const response = await fetch('/api/v1/recipes', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newRecipe)
      })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const newErrors = translateSeverErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        const body = await response.json()
        const newRecipe = body.recipe
        // setNewRecipeId(newRecipe.id)
        if(body.recipe) {
          setShouldRedirect(true)
        }
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  const handleInputChange = event => {
    setNewRecipe({
      ...newRecipe,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    addNewRecipe(newRecipe)
    clearForm()
  }
  
  const clearForm = () => {
    setNewRecipe({
      name: '',
      difficulty: '',
      diet: '',
      cookTime: '',
      description: '',
      ingredients: '',
      instructions: '',
      url: ''
    })
  }


if (shouldRedirect){
  return <Redirect to={`/recipes/${id}`} />
}

return(
    <div className='form'>
      <ErrorList errors={errors} />
      <h1 className= 'formTitle'>Add a new recipe!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            name='name'
            onChange={handleInputChange}
            value={newRecipe.name}
          />
        </label>

        <label>
          Difficulty:
          <select 
            type= 'text'
            name='difficulty' 
            onChange={handleInputChange}
            value={newRecipe.difficulty}>
            <option></option>
            <option key='easy' value='easy'>Easy</option>
            <option key='intermediate' value='intermediate'>Intermediate</option>
            <option key='advanced' value='advanced'>Advanced</option>
          </select>
        </label>

        <label>
          Diet Type:
          <select 
            name='diet' 
            onChange={handleInputChange}
            value={newRecipe.diet}>
            <option></option>
            <option value='vegetarian'>Vegetarian</option>
            <option value='vegan'>Vegan</option>
            <option value='meat'>Meat</option>
          </select>
        </label>

        <label>
          Cook Time:
          <input 
            type='text'
            name='cookTime'
            onChange={handleInputChange}
            value={newRecipe.cookTime}
          />
        </label>
        <label>
          <textarea 
            name= 'description'
            onChange={handleInputChange}
            value={newRecipe.description}
            rows= '2'
            placeholder='Description'
          />
        </label>
        <label>
          <textarea 
            name= 'ingredients'
            onChange={handleInputChange}
            value={newRecipe.ingredients}
            rows= '4'
            placeholder='Ingredients'
          />
        </label>

        <label>
          <textarea 
            name= 'instructions'
            onChange={handleInputChange}
            value={newRecipe.instructions}
            rows= '8'
            placeholder='Instructions'
          />
        </label>

        <label>
          URL:
          <input 
            type='text'
            name='url'
            onChange={handleInputChange}
            value={newRecipe.url}
          />
        </label>

        <div className='button-group'>
          <input className='button' type='submit' value='Submit' />
        </div>
      </form>
    </div>
  )
}
export default NewRecipeForm
