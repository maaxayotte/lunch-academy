import ReviewSerializer from './ReviewSerializer.js'

class RecipeSerializer {
  static getDetails(recipe) {
    const allowedAttributes = [
      "id", 
      "name", 
      "rating", 
      "description", 
      "cookTime", 
      "ingredients", 
      "instructions", 
      "imageFile", 
      "url", 
      "difficulty", 
      "diet", 
      "userId" 
    ]

    let serializedRecipe = {}
    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }

    return serializedRecipe
  }

  static async getReviewsDetails(recipe) {
    const allowedAttributes = [
      "id", 
      "name", 
      "rating", 
      "description", 
      "cookTime", 
      "ingredients", 
      "instructions", 
      "imageFile", 
      "url", 
      "difficulty", 
      "diet", 
      "userId" 
    ]

    let serializedRecipe = {}
    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }

    const reviews = await recipe.$relatedQuery("reviews")

    serializedRecipe.reviews = await Promise.all(
      reviews.map(review => {
        return ReviewSerializer.getReviewDetails(review)
      })
    )
    return serializedRecipe
  }
}

export default RecipeSerializer