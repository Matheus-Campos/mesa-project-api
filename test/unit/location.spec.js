'use strict'

const { test, trait, before, after } = use('Test/Suite')('Location')

trait('DatabaseTransactions')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Rating = use('App/Models/Rating')

const Factory = use('Factory')

const { validate } = use('Validator')

const LocationStoreValidator = use('App/Validators/LocationStore')
const LocationUpdateValidator = use('App/Validators/LocationUpdate')

before(async () => Factory.model('App/Models/User').create())

after(async () => User.query().delete())

test('it should create a new location', async ({ assert }) => {
  let location = await Factory.model('App/Models/Location').make()
  const user = await User.first()
  const locationAttributes = {
    ...location.$attributes,
    user_id: user.id
  }

  location = await Location.create(locationAttributes)

  assert.exists(location.id)
  assert.equal(locationAttributes.lat, location.lat)
  assert.equal(locationAttributes.lng, location.lng)
  assert.equal(locationAttributes.name, location.name)
  assert.equal(user.id, location.user_id)
})

test('it should show location\'s ratings and user', async ({ assert }) => {
  const user = await User.first()
  let location = await Factory.model('App/Models/Location').make()
  await user.locations().save(location)
  const rating = await Rating.create({
    location_id: location.id,
    user_id: user.id,
    rating: 5
  })

  location = await Location.query().with('user').with('ratings').first()
  location = location.toJSON()

  assert.exists(location.id)
  assert.exists(location.user)
  assert.exists(location.ratings)
  assert.equal(user.id, location.user.id)
  assert.equal(rating.id, location.ratings[0].id)
})

test('it should validate params to store a location', async ({ assert }) => {
  const data = {
    lat: 0,
    lng: 0,
    name: 'Wonderful place'
  }

  const validation = await validate(data, LocationStoreValidator.rules)

  assert.isOk(validation.fails())
})

test('it should validate params to update a location', async ({ assert }) => {
  const validation = await validate({}, LocationUpdateValidator.rules)

  assert.isOk(validation.fails())
})
