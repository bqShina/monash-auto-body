const db = require("../database");
const Record = require("../database/models/record");
const { Accident } = require("../database/models/sub-models/accident");
const { Repairer } = require("../database/models/sub-models/repairer");
const { Vehicle } = require("../database/models/sub-models/vehicle");
const { Witness } = require("../database/models/sub-models/witness");
const { Agreement } = require("../database/models/sub-models/agreement");

// Select records from the database.
exports.all = async (req, res) => {
  const records = await Record.find();

  res.json(records);
};

// Select ocord from the database.
exports.one = async (req, res) => {
  const record = await Record.findById(req.params.id);
  //   console.log("get one record work");
  res.json(record);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const data = req.body;

  const record = new Record({
    vehicleDetails: new Vehicle(data.vehicleDetails),
    offendingVehicle: new Vehicle(data.offendingVehicle),
    thirdVehicle: new Vehicle(data.thirdVehicle),
    witnessDetails: new Witness(data.witnessDetails),
    accidentDetails: new Accident(data.accidentDetails),
    repairConfirmation: new Repairer(data.repairConfirmation),
    legalAgreement: new Agreement(data.legalAgreement),
  });

  const result = await record.save();
  res.send(result);
};

// Update record information

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await Record.replaceOne({ _id: id }, data);
  res.send(result);
};

// Delete a record
exports.delete = async (req, res) => {
  const id = req.params.id;

  const record = await Record.findByIdAndRemove(id);
  res.send(record);
};
