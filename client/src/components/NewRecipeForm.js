import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import ErrorList from './ErrorList.js'
import translateSeverErrors from './../services/translateServerErrors.js'

//test

const NewRecipeForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [newRecipeId, setNewRecipeId] = useState([])
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    difficulty: '',
    dietType: '',
    cookTime: '',
    ingredients: '',
    instructions: '',
    url: ''
  })

  const addNewRecipe = async () => {
    try {
      const response = await fetch('/api/v1/recipes/new', {
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
        setNewRecipeId(newRecipe.id)
        console.log('Posted successfully!', body)
        setShouldRedirect(true)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  const clearForm = () => {
    setNewRecipe({
      title: '',
      difficulty: '',
      dietType: '',
      cookTime: '',
      ingredients: '',
      instructions: '',
      url: ''
    })
  }

const handleInputChange = event => {
  setNewRecipe({
    ...newRecipe,
    [event.currentTarget.name]: event.currentTarget.value
  })
}

const handleSubmit = (event) => {
  // event.preventDefault()
  addNewRecipe()
  clearForm()
}

if (shouldRedirect){
  return <Redirect to={`/recipes/${newRecipeId}`} />
}

return(
    <div className='form'>
      <h1 className= 'formTitle'>Add a new recipe!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            name='name'
            onChange={handleInputChange}
            value={newRecipe.title}
          />
        </label>

        <label>
          Difficulty:
          <select name='difficulty' onChange={handleInputChange}>
            <option></option>
            <option value='easy'>Easy</option>
            <option value='intermediate'>Intermediate</option>
            <option value='advanced'>Advanced</option>
          </select>
        </label>

        <label>
          Diet Type:
          <select name='dietType' onChange={handleInputChange}>
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
            name= 'ingredients'
            onChange={handleInputChange}
            value={newRecipe.ingredients}
            rows= '4'
            cols= '50'
            placeholder='Ingredients'
          />
        </label>

        <label>
          <textarea 
            name= 'instructions'
            onChange={handleInputChange}
            value={newRecipe.instructions}
            rows= '8'
            cols='50'
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
