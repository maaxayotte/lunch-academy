const Model = require('./Model')

class Review extends Model {
  static get tableName() {
    return 'reviews'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['rating', 'description', 'userId', 'recipeId'],
      properties: {
        rating: { type: ['string', 'integer'] },
        description: { type: 'string' },
        vote: { type: ['string', 'integer'] },
        userId: { type: ['string', 'integer'] },
        recipeId: { type: ['string', 'integer'] }
      }
    }
  }

  static get relationMappings() {
    const User = require('./User')
    const Recipe = require('./Recipe')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'reviews.userId',
          to: 'users.id'
        }
      },
      recipe: {
        relation: Model.BelongsToOneRelation,
        modelClass: Recipe,
        join: {
          from: 'reviews.recipeId',
          to: 'recipes.id'
        }
      }
    }
  }
}

module.exports = Review