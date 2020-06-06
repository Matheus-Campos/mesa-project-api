'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Rating = use('App/Models/Rating')

class RatingController {
  async store ({ request, auth, response }) {
    const data = request.only(['location_id', 'rating', 'comment'])

    try {
      const rating = await Rating.create({ ...data, user_id: auth.user.id })

      return rating
    } catch (err) {
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          return response.conflict({ error: 'Este local já foi avaliado por você.' })
        default:
          return response.internalServerError()
      }
    }
  }
}

module.exports = RatingController
