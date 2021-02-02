const Model = require('./Model')
const uniqueFactory = require('objection-unique')

const unique = uniqueFactory({
  fields: ['name'],
  identifiers: ['id']
})

class Recipe extends unique(Model) {
  static get tableName() {
    return 'recipes'
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "cookTime", "ingredients", "instructions", "difficulty", "diet"],
      properties: {
        name: { type: "string" },
        rating: { type: ["string", "integer"] },
        cookTime: { type: "string" },
        description: { type: "string" },
        ingredients: { type: "string" },
        instructions: { type: "string" },
        imageFile: { type: "string" },
        url: { type: "string"},
        difficulty: { type: "string"},
        diet: { type: "string"},
        userId: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { Review, User } = require('./index')

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: 'recipes.id',
          to: 'reviews.recipeId'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'recipes.userId',
          to: 'users.id'
        }
      }
    }
  }
}




module.exports = Recipe