import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'

const img = 'https://www.pngitem.com/pimgs/m/176-1768824_information-feedback-exchange-of-ideas-interview-feedback-clipart.png'

const ReviewTile = (props) => {

  const vote = " 0 "
  
  return (
    <div>
      <div className="rec-tile-container">
        <div className="recipe">
          <div className="rec-img">
          <img src={img} />
          </div>
        <div className="rec-details">
            <h2 className="rec-title">
              {props.review.user.userName} says...
            </h2>
            <p className="rec-text">{props.review.description}</p>
            <ul className="rec-info">
              <li>
                Rating:
                <strong>{props.review.rating} stars</strong>
              </li>
              <li className='arrow-icons' >
                Helpful?
                <strong>
                  <FontAwesomeIcon icon={faArrowAltCircleUp} />
                  {vote}
                  <FontAwesomeIcon icon={faArrowAltCircleDown}/>
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTile