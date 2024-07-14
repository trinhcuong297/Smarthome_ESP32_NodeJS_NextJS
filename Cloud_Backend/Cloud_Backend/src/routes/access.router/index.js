import express from "express"
import accessController from "../../controllers/access.controller.js"
import asyncMiddlewareHandler from "../../services/middleware.service.js"

const accessRouter = express.Router()

accessRouter
    .post('/user/signup', asyncMiddlewareHandler(accessController.signup))  // Sign up new user
    .post('/user/login', asyncMiddlewareHandler(accessController.login))    // Login user

export default accessRouter