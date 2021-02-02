import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
  static async getReviewDetails(review) {
    const allowedAttributes = [
      "id",
      "rating",
      "description"
    ]

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    // const user = await review.$relatedQuery('user')
    // const serializedUser = UserSerializer.getUserDetails(user)
    // serializedReview.user = serializedUser
    return serializedReview
  }
}

export default ReviewSerializer