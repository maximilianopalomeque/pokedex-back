const mongoose = require("mongoose");
const CustomError = require("../models/CustomError");

const Pokemon = require("../models/pokemonSchema");

const getPokemonData = async (req, res, next) => {
  let pokemonData;
  try {
    pokemonData = await Pokemon.find();
  } catch (error) {
    return next(new CustomError("could not get data from database", 500));
  }
  res.json(pokemonData);
};

exports.getPokemonData = getPokemonData;
