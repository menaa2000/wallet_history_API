/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User';
import UsersController from "app/controllers/Http/UsersController"
Route.post('/view_transactions_date', 'TransactionsController.view_transactions_date').middleware('auth');
Route.post('/income', 'TransactionsController.income').middleware('auth');
Route.post('/withdraw', 'TransactionsController.withdraw').middleware('auth');
Route.get('/view_last_transactions', 'TransactionsController.view_last_transactions').middleware('auth');
Route.post('/signup', 'UsersController.signup');
Route.post('/login', 'UsersController.login');
Route.get('/', async ({ view }) => {
  return view.render('home')
})
//create table transaction(id int primary key auto_increment ,subject varchar(100),amount decimal(7,2),direction int(11),user_id int ,foreign key(user_id) references users(id));