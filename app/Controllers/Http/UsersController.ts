// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from "@ioc:Adonis/Lucid/Database";
import Schema from "@ioc:Adonis/Lucid/Schema";
import User from "App/Models/User";
import hash from "Config/hash";
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from "App/Validators/LoginValidator";
import SignupValidator from "App/Validators/SignupValidator";
import { http } from "Config/app";
import bcrypt from 'bcrypt'
import Transaction from "App/Models/Transaction";
import TransactionsController from "./TransactionsController";
export default class UsersController {

      public async signup({ request, auth, response }: HttpContextContract) {
            const payload = await request.validate(SignupValidator)
            const user = User.create(payload)

      }

      public async login({ request, auth, response })//if remove context not error in auth.login
      {

            const { phone, password } = await request.validate(LoginValidator)
            const user: User | null = await User.findBy('phone', phone)
            const useer_id: User | null = await User.find(user?.id);
            return await auth.loginViaId(useer_id?.id);
      }
     
}



