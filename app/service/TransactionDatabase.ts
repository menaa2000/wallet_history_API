import Database from "@ioc:Adonis/Lucid/Database";

export default class transactionServices{
    public static async get_balance(user_id) {
        var data = await Database
            .from('transactions').select('balance').orderBy('id', 'desc').where('user_id', user_id).limit(1);
            return data
    }

    public static async update_balance_users(user_id,balance)
    {
        var userid = await Database
        .from('users').select('id').where('id', user_id).update('balance', balance)
    }
    public static async get_transactions_date(user_id,payload) {
        var data = await Database
            .from('transactions').select('id', 'subject', 'amount', 'balance', 'time_stamp').where('time_stamp', new Date(payload.time_stamp));
            return data
    }
    public static async last10_transactions(user_id) {
        var data = await Database
            .from('transactions').select('id', 'balance', 'subject').orderBy('id', 'desc').where('user_id', user_id).limit(10);
        return data
    }
}