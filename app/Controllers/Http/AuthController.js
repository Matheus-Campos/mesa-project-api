'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class AuthController {
  async signUp({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async signIn({ request, auth }) {
    const data = request.only(['email', 'password'])

    const credentials = await auth.attempt(data)

    return credentials
  }
}

module.exports = AuthController
