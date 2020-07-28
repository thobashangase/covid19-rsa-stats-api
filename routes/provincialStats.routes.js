module.exports = (app) => {
  const provincialStats = require("../controllers/provincialStats.controller.js");

  var router = require("express").Router();

  // Create a new provincialStats
  router.post("/", provincialStats.create);

  // Retrieve all provincialStatss
  router.get("/", provincialStats.findAll);

  // Retrieve a single provincialStats with id
  router.get("/:id", provincialStats.findOne);

  // Update a provincialStats with id
  router.put("/:id", provincialStats.update);

  // Delete a provincialStats with id
  router.delete("/:id", provincialStats.delete);

  // Create a new provincialStats
  router.delete("/", provincialStats.deleteAll);

  app.use("/api/provincialStats", router);
};
