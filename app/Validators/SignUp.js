'use strict'

class User {
  get rules () {
    return {
      username: 'required|unique:users|min:3',
      email: 'required|email|unique:users',
      password: 'required|confirmed|min:6'
    }
  }

  get messages () {
    return {
      'username.required': 'Você deve fornecer um nome de usuário para se cadastrar.',
      'username.unique': 'Este nome de usuário já foi utilizado, tente novamente com outro.',
      'username.min': 'O nome de usuário deve ter no mínimo 3 caracteres.',
      'email.required': '0 campo de e-mail é obrigatório para o cadastro.',
      'email.email': 'Por favor, forneça um e-mail válido.',
      'email.unique': 'Este e-mail já está em uso, você já possui uma conta aqui?',
      'password.required': 'Você precisa criar uma senha para se cadastrar.',
      'password.confirmed': 'Por favor, confirme sua senha no campo de confirmação.',
      'password.min': 'A senha deve ter no mínimo 6 caracteres.'
    }
  }
}

module.exports = User
