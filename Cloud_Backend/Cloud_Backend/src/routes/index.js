import express from "express";
import accessRouter from "./access.router/index.js";
import { AuthenticationHeader } from "../services/auth.user.service.js";
import userRouter from "./user.router/index.js";
import asyncMiddlewareHandler from "../services/middleware.service.js";
import deviceRouter from "./device.router/index.js";
import manufactorRouter from "./manufactor.router/index.js";

const ApplicationRouter = express.Router();
const ControlServiceRouter = express.Router();

ApplicationRouter
  .use("/v1/api/manufactor", manufactorRouter)        // Manufacturer devices routes
  .use("/v1/api/access", accessRouter)                // Auth routes
  .use(asyncMiddlewareHandler(AuthenticationHeader))  // Check auth routes
  .use("/v1/api/user", userRouter)                    // User routes
  .use("/v1/api/device", deviceRouter);               // Device routes

ControlServiceRouter
  // .use(asyncMiddlewareHandler(AuthenticationHeader))
  .use("/v1/api/device", deviceRouter);               // Control device routes

export {ApplicationRouter, ControlServiceRouter};
