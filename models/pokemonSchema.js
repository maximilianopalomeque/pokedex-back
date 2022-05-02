const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  types: { type: Array, required: true },
  abilities: { type: Array, required: true },
  stats: { type: Array, required: true },
  sprite: { type: String, required: true },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
