import UserService from "../services/user.service.js"

class userController {
    // Get user info from the request body (token payload) and return it to the client.
    getUserInfo = async (req, res, next) => {
        console.log("[GET] :: user ::", req.body)
        return res.status(200).json(await UserService.getUser(req))
    }
}

export default new userController