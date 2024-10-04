require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

// express app
const app = express();

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
const RoutesIndex = require("./Routes/RoutesIndex");
app.use("/api", RoutesIndex);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });
