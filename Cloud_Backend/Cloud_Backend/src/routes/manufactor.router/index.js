import express from "express";
import asyncMiddlewareHandler from "../../services/middleware.service.js";
import manufactorController from "../../controllers/manufactor.controller.js";

const manufactorRouter = express.Router();

manufactorRouter
  .post("/signup", asyncMiddlewareHandler(manufactorController.signupDeviceInfo))         // Sign up new device ID
  .get("/alldevice", asyncMiddlewareHandler(manufactorController.getAllDevices))          // Get all devices
  .get("/onedevice", asyncMiddlewareHandler(manufactorController.getDeviceInfo))          // Get device info
  .post("/assigndevice", asyncMiddlewareHandler(manufactorController.assignDevice))       // Assign device to user
  .delete("/deletedevice", asyncMiddlewareHandler(manufactorController.deleteDevice))     // Delete device  
  .post("/sensor", asyncMiddlewareHandler(manufactorController.signupSensorInfor))        // Sign up sensor info

export default manufactorRouter;
