const axios = require("axios");
const mongoose = require("mongoose");

const api_url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150";

const Pokemon = require("../models/pokemonSchema");

const getUrls = async () => {
  let response;
  try {
    response = await axios(api_url);
  } catch (error) {
    console.log(error);
    return;
  }

  return response.data.results;
};

const getDescription = async (descriptionUrl) => {
  let response;
  try {
    response = await axios(descriptionUrl);
  } catch (error) {
    console.log("could not find description");
    return;
  }

  return response.data.flavor_text_entries[9].flavor_text;
};

const getAndSaveAllPokemonData = async () => {
  const urls = await getUrls();
  if (!urls) {
    console.log("no urls fetched");
    return;
  }

  for (const url of urls) {
    let response;
    try {
      response = await axios(url); // get data of one pokemon
    } catch (error) {
      console.log("could not find pokemon data");
      return;
    }

    let description = await getDescription(response.data.species.url);
    if (!description) {
      console.log("failed to get description");
      description = "No description available";
    }

    const pokemon = new Pokemon({
      id: response.data.id,
      name: response.data.name,
      description,
      types: response.data.types,
      abilities: response.data.abilities,
      stats: response.data.stats,
      sprite: response.data.sprites.front_default,
    });

    try {
      await pokemon.save();
    } catch (error) {
      console.log("could not save pokemon", pokemon.name);
    }
  }

  console.log("data saved");
};

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to db");
    getAndSaveAllPokemonData();
  })
  .catch((error) => {
    console.log("could not connect to db");
    console.log(error);
  });

// id
// name
// sprite
// description
// types
// abilities
// stats
