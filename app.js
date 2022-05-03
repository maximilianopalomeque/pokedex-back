require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const pokemonRoutes = require("./routes/pokemon-routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    preflightContinue: true,
  })
);

app.use("/", pokemonRoutes);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "an unknown error ocurred" });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT);
