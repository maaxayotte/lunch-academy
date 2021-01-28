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
      type: 'object',
      required: ['name', 'rating', 'cookTime', 'ingredients', 'instructions', 'difficulty', 'diet', 'userId'],
      properties: {
        name: { type: 'string' },
        rating: { type: ['string', 'integer'] },
        cookTime: { type: 'string' },
        description: { type: 'string' },
        ingredients: { type: 'string' },
        instructions: { type: 'string' },
        imageFile: { type: 'string' },
        url: { type: 'string' },
        difficulty: { type: 'string' },
        diet: { type: 'string' },
        userId: { type: ['string', 'integer'] }
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
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'recipes.id',
          through: {
            from: 'reviews.recipeId',
            to: 'reviews.userId'
          },
          to: 'users.id'
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