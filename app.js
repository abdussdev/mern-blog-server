const express = require("express");
const router = require("./src/routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

// Connect to database
let URI = process.env.MONGODB;
let OPTIONS = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: "majority",
    j: true,
    wtimeout: 1000,
  },
};

mongoose
  .connect(URI, OPTIONS)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

app.get("/", (req, res) => {
  res.send("Welcome to my blog api");
});


//Routes
app.use("/api", router);

//Undefined route
app.use("*", (req, res) => {
  res.status(404).json({ status: "Fail", data: "Not found" });
});

module.exports = app;
