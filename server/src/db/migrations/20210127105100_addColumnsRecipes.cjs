/**
 * @typedef {import('knex')} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table('recipes', (table) => {
    table.string('difficulty').notNullable()
    table.string('diet').notNullable()
    table.bigInteger('userId').unsigned().index().references('users.id')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table('recipes', (table) => {
    table.dropColumn('difficulty')
    table.dropColumn('diet')
    table.dropColumn('userId')

  })
}
