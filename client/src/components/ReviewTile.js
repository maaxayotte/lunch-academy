import React from 'react'

const ReviewTile = (props) => {
  return (
    <div className="text-center main-container review-container">

      <div className="grid-x grid-margin-x">
        <div className="recipe-name cell small-6">
          {props.review.user.email} says...
        </div>
        <div className="recipe-name cell small-6">
          Rated: {props.review.rating} out of 5
        </div>
      </div>
      <div>
        {props.review.description}
      </div>
    </div>
  )
}

export default ReviewTile