'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rating extends Model {
  static get hidden () {
    return ['created_at', 'updated_at', 'user_id', 'location_id']
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  location () {
    return this.belongsTo('App/Models/Location')
  }
}

module.exports = Rating
