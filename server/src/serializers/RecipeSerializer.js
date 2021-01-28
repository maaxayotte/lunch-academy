class RecipeSerializer {
  static getDetails(recipe) {
    const allowedAttributes = ["id", "name", "rating", "description", "cookTime", "ingredients", "instructions", "imageFile", "url", "difficulty", "diet", "userId" ]

    let serializedRecipe = {}
    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }

    return serializedRecipe
  }
}

export default RecipeSerializer