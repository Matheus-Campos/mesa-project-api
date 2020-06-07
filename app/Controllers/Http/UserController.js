'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const Hash = use('Hash')

class UserController {
  async show ({ request, response }) {
    const user = await User.find(request.params.id)

    if (!user) return response.notFound({ error: 'Usuário não foi encontrado.' })

    return user
  }

  async update ({ request, auth, response }) {
    const {
      email,
      password,
      username,
      new_password: newPassword
    } = request.all()

    if (Number(request.params.id) !== auth.user.id) return response.forbidden()

    const { user } = auth

    // check if user is trying to change his password
    if (password && newPassword) {
      const samePassword = await Hash.verify(password, user.password)

      if (samePassword) {
        user.password = newPassword
      } else {
        return response.badRequest({ error: 'Digite sua senha atual corretamente para alterar sua senha.' })
      }
    }

    if (email) user.email = email
    if (username) user.username = username

    await user.save()

    return user
  }
}

module.exports = UserController
