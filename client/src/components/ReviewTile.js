import React from 'react'

const ReviewTile = (props) => {
  debugger
  return (
    <div>
      <h1>
        {props.rating}
      </h1>
      <h2>
        {props.description}
      </h2>
    </div>
  )
}

export default ReviewTile