'use strict'

class Rating {
  get rules () {
    return {
      rating: 'required|number',
      location_id: 'required|number'
    }
  }

  get messages () {
    return {
      'rating.required': 'É obrigatório dar uma nota ao avaliar.',
      'rating.number': 'A nota deve ser numérica',
      'location_id.required': 'É obrigatório ter um local para avaliar.',
      'location_id.number': 'Local inválido.'
    }
  }
}

module.exports = Rating
