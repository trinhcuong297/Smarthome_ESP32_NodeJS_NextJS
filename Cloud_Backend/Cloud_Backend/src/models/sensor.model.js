import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = "Sensor";
const COLLECTION_NAME = "SENSOR";
// Declare the Schema of the Mongo model
// switchDevice
var SensorSchema = new mongoose.Schema(
  {
    mac: {
      type: String,
      unique: true,
      require: true,
    },
    temperature: {
      type: Number,
      default: 30,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

const SensorModel = mongoose.model(DOCUMENT_NAME, SensorSchema);

export default SensorModel;
