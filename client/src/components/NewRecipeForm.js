import React, { useState } from 'react'

const NewRecipeForm = ({ postRecipe }) => {
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    difficulty: '',
    dietType: '',
    cookTime: '',
    ingredients: '',
    instructions: '',
    url: ''
  })
  
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
  event.preventDefault()
  postRecipe(newRecipe)
  clearForm()
}

return(
    <div className='form'>
      <h1 className= 'formTitle'>Add a new recipe!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            name='title'
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
