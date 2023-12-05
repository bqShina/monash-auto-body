const Record = require("../database/models/record");
const { createPdf } = require("../pdf/pdfService");

// Select rocord from the database.
exports.one = async (req, res) => {
  const record = await Record.findById(req.params.id);

  //   res.json(record);
  createPdf(record, res);
};
