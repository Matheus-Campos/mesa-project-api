'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')

trait('DatabaseTransactions')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const { validate } = use('Validator')

const SignUpValidator = use('App/Validators/SignUp')
const SignInValidator = use('App/Validators/SignIn')
const UserUpdateValidator = use('App/Validators/UserUpdate')

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
  const user = await Factory.model('App/Models/User').make()

  const userJson = user.toJSON()

  assert.isObject(userJson)
  assert.exists(userJson.username)
  assert.notExists(userJson.password)
})

test('it should update user', async ({ assert }) => {
  const user = await Factory.model('App/Models/User').make()
  const oldPassword = user.password

  user.username = 'new username'
  user.password = '12345678'
  await user.save()

  assert.equal('new username', user.username)
  assert.notEqual(oldPassword, user.password)
})

test('it should validate sign up params', async ({ assert }) => {
  const data = {
    username: 'test user',
    email: 'test@email.com',
    password: '123123',
    password_confirmation: '123456'
  }

  const validation = await validate(data, SignUpValidator.rules)

  assert.isOk(validation.fails())
})

test('it should validate sign in params', async ({ assert }) => {
  const data = {
    email: 'test@email',
    password: '123123'
  }

  const validation = await validate(data, SignInValidator.rules)

  assert.isOk(validation.fails())
})

test('it should validate update user params', async ({ assert }) => {
  const data = {
    email: 'test@email.com',
    password: '123123',
    new_password: '123'
  }

  const validation = await validate(data, UserUpdateValidator.rules)

  assert.isOk(validation.fails())
})
