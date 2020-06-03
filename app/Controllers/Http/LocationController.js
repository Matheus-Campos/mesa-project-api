'use strict'

const axios = require('axios').default
const { Client } = require('@googlemaps/google-maps-services-js')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location')

const Env = use('Env')

const axiosInstance = axios.create()
const googleMapsClient = new Client({ axiosInstance })

class LocationController {
  async index () {
    const locations = await Location.all()

    return { locations }
  }

  async store ({ request, auth, response }) {
    const { lat, lng, name, complement } = request.all()

    if (!name) return response.badRequest({ error: 'Preencha o nome do local.' })

    function findComponentByType (components, type, fallback) {
      const foundElement = components.find((component) => component.types.includes(type))
      return foundElement ? foundElement.long_name : fallback
    }

    try {
      const { data: { results: [result] } } = await googleMapsClient.reverseGeocode({
        params: {
          key: Env.get('GOOGLE_API_KEY', ''),
          language: 'pt-BR',
          latlng: { lat, lng }
        }
      })

      if (!result) return response.notFound({ error: 'Não foi possível encontrar o local solicitado.' })

      const zipcode = findComponentByType(result.address_components, 'postal_code', '')
      const country = findComponentByType(result.address_components, 'country', '')
      const state = findComponentByType(result.address_components, 'administrative_area_level_1', '')
      const city = findComponentByType(result.address_components, 'administrative_area_level_2', '')
      const district = findComponentByType(result.address_components, 'sublocality', '')
      const street = findComponentByType(result.address_components, 'route', '')
      const streetNumber = findComponentByType(result.address_components, 'street_number', '')

      const data = {
        user_id: auth.user.id,
        street_number: streetNumber,
        lat,
        lng,
        name,
        zipcode,
        street,
        district,
        city,
        state,
        country,
        complement
      }

      const location = await Location.create(data)

      return location
    } catch (err) {
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          return response.conflict({ error: 'Este local já foi cadastrado.' })
        default:
          return response.internalServerError()
      }
    }
  }

  async show ({ request, response }) {
    const location = await Location.find(request.params.id)

    if (!location) return response.notFound()

    await location.loadMany(['user', 'ratings', 'comments'])

    return location
  }

  async update ({ request, auth, response }) {
    const name = request.input('name')
    const location = await Location.find(request.params.id)

    if (!location) return response.notFound()

    if (location.user_id !== auth.user.id) return response.forbidden()

    location.name = name
    await location.save()

    return location
  }

  async destroy ({ request, auth, response }) {
    const location = await Location.find(request.params.id)

    if (!location) return response.notFound()

    if (location.user_id !== auth.user.id) return response.forbidden()

    await location.delete()

    return location
  }
}

module.exports = LocationController
