'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Comment = use('App/Models/Comment')

class CommentController {
  async store ({ request, auth }) {
    const data = request.only(['location_id', 'body'])

    const comment = await Comment.create({ ...data, user_id: auth.user.id })

    return comment
  }
}

module.exports = CommentController
