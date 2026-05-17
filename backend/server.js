require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const homeRoutes = require("./routes/homeRoute");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/home", homeRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then((connection) => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
