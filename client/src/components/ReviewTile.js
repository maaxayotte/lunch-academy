import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'

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
          <div className="far fa-2x cell small-2">
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
          </div>
          <div className="far fa-2x cell small-2">
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTile