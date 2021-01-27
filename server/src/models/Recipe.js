const Model = require("./Model")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["name"],
  identifiers: ["id"]
})

class Recipe extends unique(Model) {
  static get tableName() {
    return "recipes"
  }


  static get jsonSchema() {
    return {
      type: "object",
      required: ["name","rating", "cookTime", "ingredients", "instructions"],
      properties: {
        name: { type: "string" },
        rating: { type: ["string", "integer"] },
        cookTime: { type: "string" },
        description: { type: "string" },
        ingredients: { type: "string" },
        instructions: { type: "string" },
        imageFile: { type: "string" },
        url: { type: "string"}
        
      }
    }
  }
}

module.exports = Recipe