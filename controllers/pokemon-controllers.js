const mongoose = require("mongoose");
const CustomError = require("../models/CustomError");

const Pokemon = require("../models/pokemonSchema");

const getDataForList = async (req, res, next) => {
  let data;
  try {
    data = await Pokemon.find().select(
      "-description -_id -abilities -stats -weight -height -genderRate -__v"
    );
  } catch (error) {
    return next(
      new CustomError("could not get data for pokemon list from database", 500)
    );
  }
  res.json(data);
};

const getDataByDexNumber = async (req, res, next) => {
  const dexNumber = req.params.dexNumber;

  let pokemonData;
  try {
    pokemonData = await Pokemon.findOne({ dexNumber: dexNumber });
  } catch (error) {
    return next(
      new CustomError(
        `could not get pokemon data by dex number, dex number: ${dexNumber}`,
        500
      )
    );
  }
  res.json(pokemonData);
};

exports.getDataForList = getDataForList;
exports.getDataByDexNumber = getDataByDexNumber;
