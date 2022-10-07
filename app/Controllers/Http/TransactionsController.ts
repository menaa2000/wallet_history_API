import Database from "@ioc:Adonis/Lucid/Database";
import Schema from "@ioc:Adonis/Lucid/Schema";
import Transaction from "App/Models/Transaction";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionValidator from "App/Validators/TransactionValidator";
import User from "App/Models/User";
import { Request } from "@adonisjs/http-server/build/standalone";
import { Timestamp } from "mongodb";
import TimestampValidator from "App/Validators/TimestampValidator";
import transactionServices from "App/service/TransactionDatabase";
import userServices from "App/service/userServices";
import helperServices from "App/service/helperServices";
import amountServices from "App/service/amountServices";
export default class TransactionsController {

    public async income({ request, auth,response }) {

        var user_id= await userServices.authentication_data(auth)
        const payload = await request.validate(TransactionValidator)
if(payload.subject=='withdraw') return "invalid input,enter loan or salary only"
 
       var data= await transactionServices.get_balance(user_id)
        if (data.length == 0) {
            balance = payload.amount
            transactionServices.update_balance_users(user_id,balance)
            const trans = await Transaction.create({ ...payload, user_id, balance })
            return trans
        }
        //else
        var balance = await helperServices.separate_balance(data)
        balance = await helperServices.remove_doubleqoute_balance(balance)
        balance = await amountServices.add_amount(balance,payload)
        transactionServices.update_balance_users(user_id,balance)
        const trans = await Transaction.create({ ...payload, user_id, balance })

      // return http.response("income added successfully")//"inceome is added and balance updated"
       return response.json({
        success: true,
        message: "income added successfully"
    })
    }
    public async withdraw({ request, auth, response }) {
        var user_id= await userServices.authentication_data(auth)
        const payload = await request.validate(TransactionValidator)
        if(payload.subject!='withdraw') return "invalid input"
        var data= await transactionServices.get_balance(user_id)
        var balance = await helperServices.separate_balance(data)
        if (balance === "null") {
            return response.json({
                success: false,
                message: 'Insufficient Funds'
            })
        }
        balance = await helperServices.remove_doubleqoute_balance(balance)
        balance= await amountServices.withraw_amount(balance,payload)
        transactionServices.update_balance_users(user_id,balance)
        const trans = await Transaction.create({ ...payload, user_id, balance })
        return response.json({
            message: 'withdraw done successfully'
        })
    }
    public async view_last_transactions({auth, response }) {
        var user_id= await userServices.authentication_data(auth)
        var data = await transactionServices.last10_transactions(user_id)
        return response.json({
            success: true,
            data
        })
    }


    public async view_transactions_date({ request, auth, response }) {
        var user_id= await userServices.authentication_data(auth)
        const payload = await request.validate(TimestampValidator)
       var data=await transactionServices.get_transactions_date(user_id,payload)
        const tranactions = JSON.stringify(data)
      return response.json({
        success: true,
        message: 'Its transactions related to this date',
        data:tranactions
    })
        //new(Date) convert date input to format
    }



}
module.exports = TransactionsController