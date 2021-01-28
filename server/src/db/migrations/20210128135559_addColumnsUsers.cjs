/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("users", (table) => {
    table.string("userName").notNullable()
    table.string("firstName").notNullable()
    table.string("lastName").notNullable()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    table.dropColumn("userName")
    table.dropColumn("firstName")
    table.dropColumn("lastName")
  })
}
