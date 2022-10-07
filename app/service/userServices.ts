export default class userServices
{

    public static async authentication_data(auth) {
        const user = auth.user
       var user_id = user?.id
            return user_id
    }

}