import React from 'react'

const ReviewTile = (props) => {
  
  return (
    <div>
      <h2>
        this is the review TILE
      </h2>
      {props.review.user.userName}
      {props.review.vote}
      {props.review.rating}
      {props.review.description}
    </div>
  )
}

export default ReviewTile