export default class helperServices
{

    public static async separate_balance(data) {
        const seperate_balance = JSON.stringify(data).split(':')[1]
        var balance = seperate_balance.split('}')[0]
        return balance
    }
    public static async remove_doubleqoute_balance(balance) {
        balance = balance.replace(/['"]+/g, '');
        return balance
    }
}