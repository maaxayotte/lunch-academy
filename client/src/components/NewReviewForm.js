import React, { useState } from 'react'

const NewReviewForm = ({ postReview }) => {
  const [newReview, setNewReview] = useState({
    rating: '',
    description: ''
  })

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

  const handleSubmit = (event) => {
    event.preventDefault()
    postReview(newReview)
    clearForm()
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">
          <select
            id="rating"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
          >
            <option defaultValue>Rate this recipe 1-5 stars!</option>
            <option key="1">1</option>
            <option key="2">2</option>
            <option key="3">3</option>
            <option key="4">4</option>
            <option key="5">5</option>
          </select>
        </label>

        <label htmlFor="description">
          <textarea
            id="description"
            type="text"
            name="description"
            value={newReview.description}
            onChange={handleInputChange}
            placeholder="Write your review here..."
            rows="3"
            cols="20"
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