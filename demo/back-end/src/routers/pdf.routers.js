module.exports = (express, app) => {
  const controller = require("../controllers/pdf.controller.js");
  const router = express.Router();

  // Select one record.
  router.get("/select/:id", controller.one);

  // Add routes to server.
  app.use("/api/pdf", router);
};
