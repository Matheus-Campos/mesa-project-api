'use strict'

class UserUpdate {
  get rules () {
    return {
      email: 'email|unique:users'
    }
  }

  get messages () {
    return {
      'email.email': 'Digite um e-mail num formato válido.',
      'email.unique': 'Este e-mail já está sendo utilizado por outro usuário.'
    }
  }
}

module.exports = UserUpdate
