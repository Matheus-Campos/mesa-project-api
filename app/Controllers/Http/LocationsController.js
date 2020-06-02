'use strict'

const NodeGeocoder = require('node-geocoder')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location')

const Env = use('Env')

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: Env.get('GOOGLE_API_KEY', ''),
  httpAdapter: 'https',
})

class LocationsController {
  async index() {
    const locations = await Location.all()

    return { locations }
  }

  async store({ request, auth, response }) {
    const { lat, lng: lon } = request.all()

    const [firstPlace] = await geocoder.reverse({ lat, lon })

    if (!firstPlace) return response.badRequest()
    console.log(firstPlace)
    const data = {
      user_id: auth.user.id,
      lat: firstPlace.latitude,
      lng: firstPlace.longitude,
      zipcode: firstPlace.zipcode,
      street: firstPlace.streetName,
      street_number: firstPlace.streetNumber,
      district: firstPlace.extra ? firstPlace.extra.neighborhood : firstPlace.district,
      city: firstPlace.administrativeLevels ? firstPlace.administrativeLevels.level2long : firstPlace.city,
      state: firstPlace.administrativeLevels ? firstPlace.administrativeLevels.level1long : firstPlace.state,
      country: firstPlace.country,
      name: firstPlace.
    }

    const location = await Location.create(data)

    return location
  }

  async show({ request, response }) {
    const location = await Location.find(request.params.id)

    if (!location) return response.notFound()

    return location
  }

  async update() {}

  async destroy() {}
}

module.exports = LocationsController
