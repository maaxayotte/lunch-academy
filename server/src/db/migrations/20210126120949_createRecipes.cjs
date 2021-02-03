/**
 * @typedef {import('knex')} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
<<<<<<< HEAD
  return knex.schema.createTable("recipes", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable().unique()
    table.integer("rating")
    table.string("cookTime").notNullable()
    table.string("description")
    table.text("ingredients").notNullable()
    table.text("instructions").notNullable()
    table.string("imageFile")
    table.string("url")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
=======
  return knex.schema.createTable('recipes', (table) => {
    table.bigIncrements('id')
    table.string('name').notNullable().unique()
    table.integer('rating')
    table.string('cookTime').notNullable()
    table.string('description')
    table.text('ingredients').notNullable()
    table.text('instructions').notNullable()
    table.string('imageFile')
    table.string('url')
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
>>>>>>> 7a4ea239d03f3ca602f6fdf1b0f5313778560ac8
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('recipes')
}