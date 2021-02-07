import { Recipe, User } from "../../models/index.js"

class RecipeSeeder {
  static async seed() {
    const user = await User.query().findById(1)
    const recipesData = [
      {
        name: "Stir Fry",  
        cookTime: "25 min", 
        description: "Stir-frying is a fast way to cook small pieces of food in a hot skillet or wok. In addition to being quick and easy, stir-frying is also healthy.", 
        ingredients: "mixed veggies, soy sauce", 
        instructions: "Stir Fry Sauce Add one tablespoon of olive oil to a large skillet or wok and heat over medium high heat. Add chicken (in batches if necessary) and season with salt and pepper. Cook for 3 to 5 minutes or until cooked through. Remove from skillet. Reduce heat to medium and add remaining tablespoon of oil to the skillet.",
        difficulty: "Easy",
        diet: "Vegan",
        url: "https://assets.epicurious.com/photos/58b6ec89627f7312db0339f8/master/pass/vegetarian-greens-stir-fry-022817.jpg",
        userId: user.id
      },
      {
        name: "Peanut Butter Cookies",  
        cookTime: "1 hr", 
        description: "Super easy and fun to make!", 
        ingredients: "1 C peanut butter, 1 egg, 1 C sugar", 
        instructions: "Preheat oven to 350F, mix all ingredients together, scoop 1TBS of dough and shape into balls, flatten with fork for classic peanut butter cookie shape, bake for approx 10 min. Enjoy!",
        difficulty: "Easy",
        diet: "None",
        url: "https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/desktopimages/12367.jpg?ext=.jpg",
        userId: user.id
      },
      {
        name: "Sweet And Spicy Tofu",  
        cookTime: "22 min", 
        description: "Sweet and Spicy Tofu!", 
        ingredients: "14 oz package EXTRA FIRM tofu, 1 TBSP cornstarch or arrowroot powder plus extra as needed 2 TBSP frying oil, 1-2 TBSP sliced green onion, 1-2 tsp toasted sesame seeds, SWEET AND SPICY SRIRACHA SAUCE, 1 cup water, 1/4 cup low-sodium soy sauce or gluten-free tamari soy sauce if GF, 1/4 cup granulated sugar, 2 TBSP honey or sweet chili sauce, 2-3 cloves garlic (peeled and minced), 1-3 TBSP Sriracha, 1-2 TBSP cornstarch, 1-2 TBSP water, 1 tsp toasted sesame seeds", 
        instructions: "ADVANCE PREP: Drain and remove tofu from package. Slice the block of tofu into two 1/2 inch thin planks and place on a stack of 4-5 folded paper towels, placing an additional stack of paper towels on top. Set something heavyish on top (I use a cast iron skillet) to make a make-shift tofu press for water removal. Allow to sit. I usually start my tofu about 30 minutes before I want to start cooking. Once the water has been pressed from your tofu, cut each plank into 8 bite-sized cubes, for 16 pieces total. Sprinkle either cornstarch or arrowroot starch over the tofu and gently toss until evenly coated and no powdery spots remain. (This light coating prevents sticking and gets the outside of the tofu nice and crispy!) WHILE YOU PRESS YOUR TOFU, LET'S MAKE THE SAUCE! Measure out water, soy sauce, sugar, sriracha, honey, and garlic in a small sauce pan and bring to a boil. Start with 1 TBSP Sriracha then add extra as desired at the end after taste-testing the spice level. You can always add more at the end if desired.",
        difficulty: "Easy",
        diet: "Vegan",
        userId: user.id,
        url: "https://biancazapatka.com/wp-content/uploads/2020/02/general-tsos-sticky-tofu-spicy-sweet-sour.jpg"
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