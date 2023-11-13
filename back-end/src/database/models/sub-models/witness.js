const mongoose = require("mongoose");

// Define the schema
const witnessSchema = new mongoose.Schema({
  address: String,
  witnessMobile: String,
  witnessName: String,
});

// Create the Witness model
const Witness = mongoose.model("Witness", witnessSchema);

module.exports = { Witness, witnessSchema };
