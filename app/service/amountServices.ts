export default class amountServices
{

    public static async add_amount(balance,payload) {
    balance = await(parseInt(balance) + parseInt(payload.amount)).toString()
            return balance
    }
    public static async withraw_amount(balance,payload) {
        const b =await (parseInt(balance) - parseInt(payload.amount)).toString()
        balance = b
                return balance
        }
}