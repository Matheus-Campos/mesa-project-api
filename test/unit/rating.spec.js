'use strict'

const { test, trait, before, after } = use('Test/Suite')('Rating')
const Factory = use('Factory')

trait('DatabaseTransactions')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Rating = use('App/Models/Rating')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Location = use('App/Models/Location')

const { validate } = use('Validator')

const RatingValidator = use('App/Validators/Rating')

before(async () => {
  const user = await Factory.model('App/Models/User').create()
  const location = await Factory.model('App/Models/Location').make()
  await user.locations().save(location)
})

after(async () => {
  await Location.query().delete()
  return User.query().delete()
})

test('it should create a rating', async ({ assert }) => {
  let location = await Location.query().with('user').first()
  location = location.toJSON()

  const rating = await Rating.create({
    user_id: location.user.id,
    location_id: location.id,
    rating: 5,
    comment: 'Nice place to live'
  })

  const ratingUser = await rating.user().fetch()
  const ratingLocation = await rating.location().fetch()

  assert.equal(5, rating.rating)
  assert.equal(location.user.id, ratingUser.id)
  assert.equal(location.id, ratingLocation.id)
})

test('it should validate rating params', async ({ assert }) => {
  const location = await Location.first()
  const data = {
    rating: 5,
    location_id: location.id
  }
  const validation = await validate(data, RatingValidator.rules)

  assert.isOk(validation.fails())
})
