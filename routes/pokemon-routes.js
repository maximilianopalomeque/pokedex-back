const express = require("express");
const pokemonControllers = require("../controllers/pokemon-controllers");

const router = express.Router();

router.get("/", pokemonControllers.getPokemonData);

module.exports = router;
