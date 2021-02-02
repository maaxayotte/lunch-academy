/**
 * @typedef {import('knex')} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
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
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('recipes')
}