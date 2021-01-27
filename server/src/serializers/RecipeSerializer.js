class RecipeIndexSerializer {
  static getDetails(recipe) {
    const allowedAttributes = ["id", "name", "rating", "description"]

    let serializedRecipe = {}
    for (const attribute of allowedAttributes) {
      serializedRecipe[attribute] = recipe[attribute]
    }

    return serializedRecipe
  }
}

export default RecipeIndexSerializer