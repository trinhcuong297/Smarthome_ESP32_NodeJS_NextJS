import ManufactorService from "../services/manufactor.service.js";

class ManufactorController {
  // Sign up new device ID controller
  signupDeviceInfo = async (req, res, next) => {
    console.log("[POST] :: Sign up device Infor :: ", req.body);
    return res.status(201).json(await ManufactorService.signupDevice(req.body));
  };

  // Get all devices controller
  getAllDevices = async (req, res, next) => {
    return res.status(200).json(await ManufactorService.getAllDeviceInfo());
  };

  // Get device info by ID controller
  getDeviceInfo = async (req, res, next) => {
    console.log("[GET] Device ID :: ", req.body?.ID);
    res.status(200).json(await ManufactorService.getDeviceInfo(req.body?.ID));
  };

  // Assign device to user controller
  assignDevice = async (req, res, next) => {
    console.log("[POST] Device ID, User ID :: ", req.body);
    res.status(200).json(await ManufactorService.assignDevice(req.body));
  };

  // Delete device by ID controller
  deleteDevice = async (req, res, next) => {
    console.log("[DELETE] Device ID ::", req.body?.ID);
    return res
      .status(200)
      .json(await ManufactorService.deleteDevice(req.body?.ID));
  };

  // Control device controller
  signupSensorInfor = async (req, res, next) => {
    console.log("POST:: SENSOR INFOR");
    const mac = req.body.mac;
    return res.status(200).json(await ManufactorService.signupSensor(mac));
  };
}

export default new ManufactorController();
