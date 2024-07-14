import DeviceService from "../services/device.service.js";

class DeviceController {
  // Sign up new device ID
  claimDeviceInfo = async (req, res, next) => {
    console.log("[POST] :: Claim device Infor :: ", req.body);
    return res.status(201).json(await DeviceService.claimDevice(req.body));
  };

  // Get all devices of a user
  getAllDevices = async (req, res, next) => {
    console.log("[GET] All Device Infor :: ");
    const userID = await req.get("CLIENT_ID");
    return res.status(200).json(await DeviceService.getAllDeviceInfo(userID));
  };

  // Get device information by ID
  getDeviceInfo = async (req, res, next) => {
    console.log("[GET] Device Infor :: ", req.params.id);
    const deviceInfo = {
      deviceID: req.params.id,
      userID: await req.get("CLIENT_ID"),
    };
    return res.status(200).json(await DeviceService.getDeviceInfo(deviceInfo));
  };

  // Update device information
  claimDeviceInfo = async (req, res, next) => {
    console.log("[POST] :: Claim device Infor :: ", req.body);
    return res.status(201).json(await DeviceService.claimDevice(req.body));
  };

  // Delete device by ID
  deleteDevice = async (req, res, next) => {
    console.log("[DELETE] device ::", req.body);
    return res.status(200).json(await DeviceService.deleteDevice(req.body));
  };

  // Control device
  controlDevice = async (req, res, next) => {
    console.log("value here:: ", req.body );
    return res.status(200).json(
      await DeviceService.controlDevice({
        deviceID:req.params.id,
        value: req.body.value,
      })
    );
  };

  // Get sensor data from device
  sensorDevice = async (req, res, next) => {
    console.log("[GET] device :: sensor");
    return res.status(200).json(await DeviceService.getSensorData());
  };
}

export default new DeviceController();
