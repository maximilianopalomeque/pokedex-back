const express = require("express");
const pokemonControllers = require("../controllers/pokemon-controllers");

const router = express.Router();

router.get("/", pokemonControllers.getDataForList);
router.get("/:dexNumber", pokemonControllers.getDataByDexNumber);

module.exports = router;
