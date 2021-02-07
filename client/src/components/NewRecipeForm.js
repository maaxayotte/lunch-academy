import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import ErrorList from './ErrorList.js'
import translateServerErrors from './../services/translateServerErrors.js'

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
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        const body = await response.json()
        const newRecipe = body.recipe
        setNewRecipeId(newRecipe.id)
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
    if (response.ok) {
      clearForm()
    }
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
  return <Redirect to={`/recipes/${newRecipeId}`} />
}

return(
    <div className='form background-runner'>
      <ErrorList errors={errors} />
      <form className='main-container recipe-form' onSubmit={handleSubmit}>
        <h1 className= 'text-center formTitle'>Add a new recipe!</h1>
        <label>
          Title:
          <input
            className='input'
            type='text'
            name='name'
            onChange={handleInputChange}
            value={newRecipe.name}
          />
        </label>

        <label>
          Difficulty:
          <select 
            className='input'
            name='difficulty' 
            onChange={handleInputChange}
            value={newRecipe.difficulty}>
            <option></option>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>
        </label>

        <label>
          Diet Type:
          <select 
            className='input'
            name='diet' 
            onChange={handleInputChange}
            value={newRecipe.diet}>
            <option></option>
            <option value='Vegetarian'>Vegetarian</option>
            <option value='Vegan'>Vegan</option>
            <option value='Meat'>Meat</option>
          </select>
        </label>

        <label>
          Cook Time:
          <input 
            className='input'
            type='text'
            name='cookTime'
            onChange={handleInputChange}
            value={newRecipe.cookTime}
          />
        </label>
        <label>
          <textarea 
            className='input'
            name= 'description'
            onChange={handleInputChange}
            value={newRecipe.description}
            rows= '2'
            placeholder='Description'
          />
        </label>
        <label>
          <textarea 
            className='input'
            name= 'ingredients'
            onChange={handleInputChange}
            value={newRecipe.ingredients}
            rows= '4'
            placeholder='Ingredients'
          />
        </label>

        <label>
          <textarea 
            className='input'
            name= 'instructions'
            onChange={handleInputChange}
            value={newRecipe.instructions}
            rows= '6'
            placeholder='Instructions'
          />
        </label>

        <label>
          Image URL (optional):
          <input
            className='input' 
            type='text'
            name='url'
            onChange={handleInputChange}
            value={newRecipe.url}
          />
        </label>
        <div className='button-group'>
          <input 
            className='btn btn-primary' 
            type='submit' 
            value='Submit' 
          />
        </div>
      </form>
    </div>
  )
}
export default NewRecipeForm
