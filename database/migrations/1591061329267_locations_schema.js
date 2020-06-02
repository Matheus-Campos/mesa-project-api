'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocationsSchema extends Schema {
  up () {
    this.create('locations', (table) => {
      table.increments()
      table.float('lat', 9, 6).notNullable()
      table.float('lng', 9, 6).notNullable()
      table.string('name', 254).notNullable()
      table.string('street', 254).notNullable()
      table.string('street_number', 10)
      table.string('complement', 100)
      table.string('district', 50).notNullable()
      table.string('city', 50).notNullable()
      table.string('state', 50).notNullable()
      table.string('country', 100).notNullable()
      table.string('zipcode', 15)
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.unique(['lat', 'lng'])
      table.timestamps()
    })
  }

  down () {
    this.drop('locations')
  }
}

module.exports = LocationsSchema
