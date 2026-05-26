require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const homeRoutes = require("./routes/homeRoute");
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/home", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log(`${req.ip}`);
  next();
});

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
