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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/login', 'UserController.login').middleware(['graph'])
Route.get('/user/:id', 'UserController.byID').middleware(['graph'])
Route.post('/signup', 'UserController.store').middleware(['graph'])
Route.post('/delete/user/:id', 'UserController.deleteID').middleware(['graph'])
Route.post('/update/user/:id', 'UserController.updateID').middleware(['graph'])
