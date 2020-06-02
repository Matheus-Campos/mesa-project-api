'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rating extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  location () {
    return this.belongsTo('App/Models/Location')
  }
}

module.exports = Rating
