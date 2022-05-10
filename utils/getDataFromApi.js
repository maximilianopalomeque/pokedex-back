const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const axios = require("axios");
const mongoose = require("mongoose");

const api_url = process.env.POKEMON_API_URL;

const Pokemon = require("../models/pokemonSchema");

const getUrls = async () => {
  const response = await axios(api_url);
  return response?.data?.results;
};

const getDescription = async (descriptionUrl) => {
  const response = await axios(descriptionUrl);
  return response?.data?.flavor_text_entries[9]?.flavor_text;
};

const getGender = async (genderUrl) => {
  const response = await axios(genderUrl);
  return (response?.data?.gender_rate / 8) * 100; // gender are in eighths
};

const getAndSaveAllPokemonData = async () => {
  const urls = await getUrls();
  if (!urls) {
    console.log("no urls fetched");
    return;
  }

  for (url of urls) {
    let response;
    try {
      response = await axios(url); // get data of one pokemon
    } catch (error) {
      console.log("could not find pokemon data");
      return;
    }

    let description = await getDescription(response?.data?.species?.url);
    if (!description) {
      console.log("failed to get description for url:", url);
      description = "No description available";
    }

    let genderRate = await getGender(response?.data?.species?.url);
    if (!genderRate) {
      console.log("failed to get genderRate from url:", url);
      genderRate = 0;
    }

    // height and weight are in hectograms
    const weight = response.data.weight / 10;
    const height = response.data.height / 10;

    const pokemon = new Pokemon({
      dexNumber: response.data.id,
      name: response.data.name,
      types: response.data.types,
      abilities: response.data.abilities,
      stats: response.data.stats,
      image: response.data.sprites.front_default,
      description,
      weight,
      height,
      genderRate,
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
