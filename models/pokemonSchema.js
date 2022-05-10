const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  dexNumber: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  types: { type: Array, required: true },
  abilities: { type: Array, required: true },
  stats: { type: Array, required: true },
  image: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  genderRate: { type: Number, required: true },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
