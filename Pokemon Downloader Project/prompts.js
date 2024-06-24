import fetch from "node-fetch";
import inquirer from "inquirer";
import { parseOptions } from "./saving.js";

//URL
// https://pokeapi.co/api/v2/pokemon/{name}

// taking input from command line using inquirer
// const questions = [
//   {
//     type: "input",
//     name: "name",
//     message: "What's your name?",
//   },
// ];
// inquirer.prompt(questions).then((answers) => {
//   console.log(`Hi ${answers.name}!`);
// });

// const pokemonNames = async () => {
//   try {
//     const response = await fetch(
//       "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
//     );
//     if (!response.ok) {
//       throw new Error("Network not available!");
//     }
//     const data = await response.json();
//     for (const item of Object.entries(data.results)) {
//       console.log(item[1].name);
//     }
//   } catch (error) {
//     console.error("Error fetching pokemon data", error);
//   }
// };
// pokemonNames();

// const fetchPokemon = async (pokemonName) => {
//   try {
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
//     );
//     return response.json();
//   } catch (error) {
//     console.error(error);
//   }
// };

const fetchPokemon = async (pokemonName) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const json = await response.json();
  return json;
};

const promptForPokemon = async () => {
  return await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Pokemon name: ",
  });
};

const promptForInfoToDownload = async () => {
  return await inquirer.prompt({
    type: "checkbox",
    name: "options",
    message: "Pokemon info to download: ",
    choices: [
      new inquirer.Separator(" --- Options --- "),
      {
        name: "Sprites",
      },
      {
        name: "Stats",
      },
      {
        name: "Artwork",
      },
    ],
  });
};

const promptToContinue = async () => {
  return await inquirer.prompt({
    type: "list",
    name: "continue",
    message: "Would you like to search another pokemon?",
    choices: ["Yes", "No"],
  });
};

const promptUser = async () => {
  while (true) {
    const pokemonName = await promptForPokemon();
    //fetch pokemon JSON
    const pokemonJSON = await fetchPokemon(pokemonName.name.toLowerCase());
    console.log(pokemonJSON.name, pokemonJSON.weight);
    const downloadOptions = await promptForInfoToDownload();
    await parseOptions(pokemonJSON, downloadOptions);

    const keepGoing = await promptToContinue();
    if (keepGoing.continue === "No") break;
  }
};

export { promptUser };
