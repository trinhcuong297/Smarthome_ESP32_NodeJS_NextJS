import express from "express";
import asyncMiddlewareHandler from "../../services/middleware.service.js";
import deviceController from "../../controllers/device.controller.js";

const deviceRouter = express.Router();

deviceRouter
  .post("/claim", asyncMiddlewareHandler(deviceController.claimDeviceInfo))       // Claim device info
  .get("/alldevice", asyncMiddlewareHandler(deviceController.getAllDevices))      // Get all devices
  .get("/onedevice/:id", asyncMiddlewareHandler(deviceController.getDeviceInfo))  // Get one device info
  .patch("/control/:id", asyncMiddlewareHandler(deviceController.controlDevice))  // Control device
  .post("/delete", asyncMiddlewareHandler(deviceController.deleteDevice))         // Delete device
  .get("/sensor", asyncMiddlewareHandler(deviceController.sensorDevice));         // Get sensor data from device
  
export default deviceRouter;
