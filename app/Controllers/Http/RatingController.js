'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Rating = use('App/Models/Rating')

class RatingController {
  async store ({ request, auth }) {
    const data = request.only(['location_id', 'rating'])

    const rating = await Rating.create({ ...data, user_id: auth.user.id })

    return rating
  }
}

module.exports = RatingController
