'use strict'

class User {
  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return {
      'username.required': 'Você deve fornecer um nome de usuário para se cadastrar.',
      'username.unique': 'Este nome de usuário já foi utilizado, tente novamente com outro.',
      'email.required': '0 campo de e-mail é obrigatório para o cadastro.',
      'email.email': 'Por favor, forneça um e-mail válido.',
      'email.unique': 'Este e-mail já está em uso, você já possui uma conta aqui?',
      'password.required': 'Você precisa criar uma senha para se cadastrar.',
      'password.confirmed': 'Por favor, confirme sua senha no campo de confirmação.'
    }
  }
}

module.exports = User
