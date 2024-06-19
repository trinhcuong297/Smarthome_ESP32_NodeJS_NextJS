import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = 'History'
const COLLECTION_NAME = 'HISTORY'
// Declare the Schema of the Mongo model
// switchDevice
var historySchema = new mongoose.Schema({
  deviceID: {
    type: String,
    trim: true,
    unique: true,
  },
  value: {
    type: Object,
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

const HistoryModel = mongoose.model(DOCUMENT_NAME, historySchema);

export default HistoryModel;
