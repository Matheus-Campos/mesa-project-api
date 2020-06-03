'use strict'

class LocationStore {
  get rules () {
    return {
      lat: 'required|number',
      lng: 'required|number',
      name: 'required'
    }
  }

  get messages () {
    return {
      'lat.required': 'O campo latitude é obrigatório para cadastrar um local.',
      'lng.required': 'O campo longitude é obrigatório para cadastrar um local.',
      'lat.number': 'O campo latitude deve ser um número.',
      'lng.number': 'O campo longitude deve ser um número.',
      'name.required': 'O campo nome é obrigatório.'
    }
  }
}

module.exports = LocationStore
