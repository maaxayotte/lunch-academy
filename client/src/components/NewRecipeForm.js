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
        <select value={newRecipe.difficulty} onChange={handleInputChange}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </label>

      <label>
        Diet Type:
        <select value={newRecipe.dietType} onChange={handleInputChange}>
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
        <input 
          type='text'
          name='url'
          onchange={handleInputChange}
          value={newRecipe.url}
        />
      </label>

      <div className='button-group'>
        <input className='button' type='submit' value='Submit' />
      </div>
    </form>
  </div>
)

export default NewRecipeForm