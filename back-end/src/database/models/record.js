const mongoose = require("mongoose");

const { vehicleSchema } = require("./sub-models/vehicle");
const { witnessSchema } = require("./sub-models/witness");
const { accidentSchema } = require("./sub-models/accident");
const { repairerSchema } = require("./sub-models/repairer");
const { agreementSchema } = require("./sub-models/agreement");

// Define the schema for Record, combining the sub-schemas
const recordSchema = new mongoose.Schema({
  vehicleDetails: vehicleSchema,
  offendingVehicle: vehicleSchema,
  thirdVehicle: vehicleSchema,
  witnessDetails: witnessSchema,
  accidentDetails: accidentSchema,
  repairConfirmation: repairerSchema,
  legalAgreement: agreementSchema,
});

// Create the Record model
const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
