const mongoose = require("mongoose");

// Define the schema
const agreementSchema = new mongoose.Schema({
  signDate: String,
  signature: String,
});

// Create the Repairer model
const Agreement = mongoose.model("Agreement", agreementSchema);

module.exports = { Agreement, agreementSchema };
