'use strict'

class SignIn {
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'Você deve fornecer um e-mail para continuar.',
      'email.email': 'Você deve fornecer um e-mail válido.',
      'password.required': 'Você precisa fornecer sua senha para continuar.'
    }
  }
}

module.exports = SignIn
