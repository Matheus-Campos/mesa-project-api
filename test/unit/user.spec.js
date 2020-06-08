'use strict'

const { test, trait } = use('Test/Suite')('User')

trait('DatabaseTransactions')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

test('it should create a new user', async ({ assert }) => {
  const data = {
    username: 'test user',
    email: 'test@test.com',
    password: '123456'
  }
  const user = await User.create(data)

  assert.equal(data.username, user.username)
  assert.equal(data.email, user.email)
  assert.notEqual(data.password, user.password)
})

test('it should hide user password', async ({ assert }) => {
  const data = {
    username: 'test user 1',
    email: 'test1@test.com',
    password: '123456'
  }
  const user = await User.create(data)

  const userJson = user.toJSON()

  assert.isObject(userJson)
  assert.exists(userJson.username)
  assert.notExists(userJson.password)
})

test('it should update user', async ({ assert }) => {
  const data = {
    username: 'test user',
    email: 'test@test.com',
    password: '123456'
  }
  const user = await User.create(data)
  const oldPassword = user.password

  user.username = 'new username'
  user.password = '12345678'
  await user.save()

  assert.equal('new username', user.username)
  assert.notEqual(oldPassword, user.password)
})
