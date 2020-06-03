'use strict'

class LocationUpdate {
  get rules () {
    return {
      name: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'O campo nome é obrigatório.'
    }
  }
}

module.exports = LocationUpdate
