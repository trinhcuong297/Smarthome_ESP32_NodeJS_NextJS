import accessUserService from "../services/access.user.service.js"

class accessController {
    // Sign up new user
    signup = async (req, res, next) => {
        console.log("[POST] :: signup ::", req.body)
        return res.status(201).json(await accessUserService.signup(req.body))
    }

    // Login existing user
    login = async (req, res, next) => {
        console.log("[POST] :: login ::", req.body)
        return res.status(200).json(await accessUserService.login(req.body))
    }
}

export default new accessController