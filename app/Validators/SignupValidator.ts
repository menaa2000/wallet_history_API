import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'
export default class SignupValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({


    name: schema.string({ trim: true }, [
      rules.maxLength(50),
      rules.minLength(3),
    ]),
    email: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(8)]),
    phone: schema.string({}, [rules.minLength(11),rules.unique({ table: 'users', column: 'phone' })])
   /* name: schema.string({},[rules.required()]),
    email: schema.string({}, [rules.email,rules.required()]),
    password: schema.string({},[
      rules.confirmed,rules.required()
    ])*/

/*
    name: schema.string([
      rules.trim(),rules.minLength(3),rules.required(), rules.maxLength(50)
    ]),
    phone: schema.string([
      rules.trim(),rules.nullable,rules.minLength(11), rules.required(),rules.unique,rules.maxLength(11)
    ]),
    email: schema.string([
      rules.nullable,rules.email,rules.required(), rules.trim,rules.unique
    ])
, password: schema.string([
  rules.trim,rules.required(), rules.nullable
])
*/
  /*  name: schema.string({}, [rules.minLength(3),rules.trim,rules.required(), rules.maxLength(50)]),
    phone: schema.string({}, [rules.nullable,rules.minLength(11), rules.required(),rules.unique,rules.maxLength(11)]),
    email: schema.string({}, [rules.nullable,rules.email,rules.required(), rules.trim,rules.unique]),
    password: schema.string({}, [rules.trim,rules.required(), rules.nullable]),*/
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}