import React from 'react'

const ReviewTile = (props) => {

  return (
    <div className="text-center main-container review-container">

      <div className="grid-x grid-margin-x">
        <div className="recipe-name cell small-6">
          {props.review.user.userName} says...
        </div>
        <div className="recipe-name cell small-6">
          Rated: {props.review.rating} out of 5
        </div>
      </div>

      <div>
        {props.review.description}
      </div>

      <div className="grid-x grid-margin-x">
        <div className="grid-x grid-margin-x cell small-6">
          <i class="far fa-arrow-alt-circle-up fa-2x cell small-2"></i>
          <div className="vote-number">
          {props.review.vote}
          </div>
          <i class="far fa-arrow-alt-circle-down fa-2x cell small-2"></i>
        </div>

      </div>
    </div>
  )
}

export default ReviewTile