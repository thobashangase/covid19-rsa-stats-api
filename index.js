// import dotenv from "dotenv";
// dotenv.config();

require("dotenv").config();

var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// import models, { connectDb } from "./models";

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
db.mongoose.set("useCreateIndex", true);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Thoba's COVID-19 South African stats API." });
});

require("./routes/provincialStats.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
