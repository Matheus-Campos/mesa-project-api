'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Location extends Model {
  static get hidden () {
    return ['user_id']
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Location
