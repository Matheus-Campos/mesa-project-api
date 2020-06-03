'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sign_up', 'AuthController.signUp').validator('SignUp')
Route.post('/sign_in', 'AuthController.signIn').validator('SignIn')

Route.group(() => {
  Route
    .resource('locations', 'LocationController')
    .apiOnly()
    .validator(new Map([
      [['locations.store'], ['LocationStore']],
      [['locations.update'], ['LocationUpdate']]
    ]))

  Route.get('/users/:id', 'UserController.show')
  Route.put('/users/:id', 'UserController.update').validator('UserUpdate')
  Route.post('/ratings', 'RatingController.store')
  Route.post('/comments', 'CommentController.store')
}).prefix('api/v1').middleware(['auth'])
