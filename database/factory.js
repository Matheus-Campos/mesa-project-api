'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.name(),
    email: faker.email(),
    password: await Hash.make(faker.password())
  }
})

Factory.blueprint('App/Models/Location', (faker) => {
  return {
    lat: faker.latitude(),
    lng: faker.longitude(),
    name: faker.string(),
    street: faker.street(),
    street_number: faker.integer(),
    complement: faker.sentence(),
    district: faker.city(),
    city: faker.city(),
    state: faker.state(),
    country: faker.country(),
    zipcode: faker.zip()
  }
})

Factory.blueprint('App/Models/Rating', (faker) => {
  return {
    rating: faker.integer(),
    comment: faker.paragraph()
  }
})
