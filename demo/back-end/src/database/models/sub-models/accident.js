const mongoose = require("mongoose");

// Define the schema
const accidentSchema = new mongoose.Schema({
  accidentCarImage: [String],
  accidentDate: String,
  accidentDescription: String,
  accidentPlace: String,
  accidentTime: String,
  reportedPolice: String,
  policeStation: String,
});

// Create the Accident model
const Accident = mongoose.model("Accident", accidentSchema);

module.exports = { Accident, accidentSchema };
