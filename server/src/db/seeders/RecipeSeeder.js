import { Recipe } from "../../models/index.js"

class RecipeSeeder {
  static async seed() {
    const recipesData = [
      {
        name: "Spicy Stir Fry", 
        rating: 5, 
        cookTime: "25 min", 
        description: "hot, hot, hot!", 
        ingredients: "mixed veggies, soy sauce", 
        instructions: "put it in a pan until it tastes gud"
      },
      {
        name: "Easy Peanut Butter Cookies", 
        rating: 5, 
        cookTime: "1 hr", 
        description: "super easy and fun to make!", 
        ingredients: "1 C peanut butter, 1 egg, 1 C sugar", 
        instructions: "preheat oven to 350F, mix all ingredients together, scoop 1TBS of dough and shape into balls, flatten with fork for classic peanut butter cookie shape, bake for approx 10 min. Enjoy!"
      }
    ]

    for (const singleRecipeData of recipesData) {
      const currentRecipe = await Recipe.query().findOne(singleRecipeData)
      if (!currentRecipe) {
        await Recipe.query().insert(singleRecipeData)
      }
    }
  }
}

export default RecipeSeeder