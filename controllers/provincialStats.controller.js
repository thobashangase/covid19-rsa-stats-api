// import models from "../models";
const db = require("../models");
const ProvincialStats = db.provincialStats;

// Create and Save a new provincialStats
exports.create = (req, res) => {
  // Validate request
  if (!req.body.provinceCode) {
    res.status(400).send({ message: "Province code can not be empty!" });
    return;
  }

  if (!req.body.province) {
    res.status(400).send({ message: "Province can not be empty!" });
    return;
  }

  if (req.body.confirmedCases == undefined) {
    res.status(400).send({ message: "Confirmed cases can not be empty!" });
    return;
  }

  if (req.body.recoveries == undefined) {
    res.status(400).send({ message: "Recoveries can not be empty!" });
    return;
  }

  if (req.body.deaths == undefined) {
    res.status(400).send({ message: "Deaths can not be empty!" });
    return;
  }

  // Create a provincialStats
  const provincialStats = new db.provincialStats({
    provinceCode: req.body.provinceCode,
    province: req.body.province,
    confirmedCases: req.body.confirmedCases,
    recoveries: req.body.recoveries,
    deaths: req.body.deaths,
  });

  // Save provincialStats in the database
  provincialStats
    .save(provincialStats)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the provincialStats.",
      });
    });
};

// Retrieve all provincialStatss from the database.
exports.findAll = (req, res) => {
  const provinceCode = req.query.provinceCode;
  var condition = provinceCode
    ? { provinceCode: { $regex: new RegExp(provinceCode), $options: "i" } }
    : {};

  let provincialStats = [
    {
      id: String,
      provinceCode: String,
      province: String,
      confirmedCases: Number,
      recoveries: Number,
      deaths: Number,
    },
  ];

  ProvincialStats.find(condition)
    .then((data) => {
      data.map((value) => {
        provincialStats.push({
          id: value._id,
          provinceCode: value.provinceCode,
          province: value.province,
          confirmedCases: value.confirmedCases,
          recoveries: value.recoveries,
          deaths: value.deaths,
        });
      });
      res.send(provincialStats);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving provincialStats.",
      });
    });
};

// Find a single provincialStats with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProvincialStats.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found provincialStats with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving provincialStats with id=" + id });
    });
};

// Update a provincialStats by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  ProvincialStats.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update provincialStats with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "provincialStats was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating provincialStats with id=" + id,
      });
    });
};

// Delete a provincialStats with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ProvincialStats.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete provincialStats with id=${id}. Maybe provincialStats was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was provincialStats successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete provincialStats with id=" + id,
      });
    });
};

// Delete all provincialStatss from the database.
exports.deleteAll = (req, res) => {
  ProvincialStats.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} provincialStatss were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all provincialStatss.",
      });
    });
};
