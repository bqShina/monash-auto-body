module.exports = (express, app) => {
  const controller = require("../controllers/record.controller.js");
  const router = express.Router();

  // Select all records.
  router.get("/", controller.all);

  // Select one record.
  router.get("/select/:id", controller.one);

  // Update record details.
  router.put("/update/:id", controller.update);

  // Delete record details.
  router.delete("/delete/:id", controller.delete);

  // Create a new record.
  router.post("/", controller.create);

  // Add routes to server.
  app.use("/api/records", router);
};
