'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RatingsSchema extends Schema {
  up () {
    this.create('ratings', (table) => {
      table.increments()
      table.integer('rating').notNullable()
      table.text('comment')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('location_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('locations')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.unique(['user_id', 'location_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('ratings')
  }
}

module.exports = RatingsSchema
