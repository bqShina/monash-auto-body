const mongoose = require("mongoose");

// Define the schema
const vehicleSchema = new mongoose.Schema({
  AbnNumber: String,
  GstRegistered: String,
  addressDriver: String,
  addressOwner: String,
  contactNumDriver: String,
  contactNumOwner: String,
  dobDriver: String,
  dobOwner: String,
  emailDriver: String,
  emailOwner: String,
  expiryDateDriver: String,
  expiryDateOwner: String,
  insured: String,
  insurer: String,
  insurerPolicyNum: String,
  licenceNumDriver: String,
  licenceNumOwner: String,
  model: String,
  nameDriver: String,
  nameOwner: String,
  vehicleRegistration: String,
});

// Create the Vehicle model
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = { Vehicle, vehicleSchema };
