import React from 'react'

let img = 'https://www.pngitem.com/pimgs/m/176-1768824_information-feedback-exchange-of-ideas-interview-feedback-clipart.png'

const ReviewTile = (props) => {
  
  return (
    <div>
      <div className="rev-tile-container">
        <div className="recipe">
          <div className="rec-img">
          <img src={img} />
          </div>
        <div className="rec-details">
            <h2 className="rec-title">
              {props.review.user.firstName} says...
            </h2>
            <p className="rev-text">{props.review.description}</p>
            <ul className="rec-info">
              <li>
                Rating:
                <strong>{props.review.rating} stars</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTile