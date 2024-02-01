const express = require("express");
const cors = require("cors");
const { createPdf } = require("./src/pdf/pdfService");

const app = express();
const db = require("./src/database/index");

// Parse requests of content-type - application/json.
app.use(express.json({ limit: "50mb" }));

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
// createPdf();

// Add user routes.
require("./src/routers/user.routers.js")(express, app);
require("./src/routers/record.routers.js")(express, app);
require("./src/routers/pdf.routers.js")(express, app);

// Set port, listen for requests.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
