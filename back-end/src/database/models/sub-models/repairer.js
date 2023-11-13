const mongoose = require("mongoose");

// Define the schema
const repairerSchema = new mongoose.Schema({
  referringRepairer: String,
  repairerContact: String,
  signDate: String,
  signature: String,
});

// Create the Repairer model
const Repairer = mongoose.model("Repairer", repairerSchema);

module.exports = { Repairer, repairerSchema };
