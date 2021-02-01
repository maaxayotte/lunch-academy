import React, { useState } from 'react'

const NewReviewForm = props => {
  const [newReview, setNewReview] = useState({
    rating: '',
    description: ''
  })
  const [errors, setErrors] = useState([])

  const addNewReview = async () => {
    
  }

  const clearForm = () => {
    setNewReview({
      rating: '',
      description: ''
    })
  }

  const handleInputChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className='form'>
      <form>
        <label htmlFor="rating">
          <select
            id="rating"
            name="rating"
            value={newReview.value}
            onChange={handleInputChange}
          >
            <option defaultValue>Rate this recipe 1-5 stars!</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>

        <label htmlFor="description">
          <input
            id="description"
            type="text"
            name="description"
            value={newReview.description}
            onChange={handleInputChange}
            placeholder="Write your review here..."
          />
        </label>

        <div className='button-group'>
          <input className='button' type='submit' value='Submit' />
        </div>
      </form>
    </div>
  )
}

export default NewReviewForm