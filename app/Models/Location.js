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

  ratings () {
    return this.hasMany('App/Models/Rating')
  }

  comments () {
    return this.hasMany('App/Models/Comment')
  }
}

module.exports = Location
