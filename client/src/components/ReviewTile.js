import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'

const ReviewTile = (props) => {
  // debugger
  const [selectedUpVote, setSelectedUpVote] = useState(false)
  const [selectedDownVote, setSelectedDownVote] = useState(false)

  let upVoteColor
  let downVoteColor
  

  let upVoteSelectedStatus = false
  if (selectedUpVote === props.review.id) {
    upVoteSelectedStatus = true
  }
  let downVoteSelectedStatus = false
  if (selectedDownVote === props.review.id) {
    downVoteSelectedStatus = true
  }

  if (!upVoteSelectedStatus) {
    upVoteColor = "unselected"
  } else if (upVoteSelectedStatus) {
    upVoteColor = "upvote"
  }
  if (!downVoteSelectedStatus) {
    downVoteColor = "unselected"
  } else if (downVoteSelectedStatus) {
    downVoteColor = "downvote"
  }

  const upVote = () => {
    if (selectedUpVote !== props.review.id) {
      return setSelectedUpVote(props.review.id)
    } else {
      return setSelectedUpVote(false)
    }
  }
  const downVote = () => {
    if (selectedDownVote !== props.review.id) {
      return setSelectedDownVote(props.review.id)
    } else {
      return setSelectedDownVote(false)
    }
  }

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

      <div className="grid-x grid-margin-x">
        <div className="grid-x grid-margin-x cell small-6">
          <div className="far fa-2x cell small-2" id={upVoteColor} onClick={upVote}>
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
          </div>
          <div className="far fa-2x cell small-2" id={downVoteColor} onClick={downVote}>
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTile