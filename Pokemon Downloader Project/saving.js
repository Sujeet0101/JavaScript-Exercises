import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

const saveImageFile = async (fileName, arrayBuffer) => {
  await fs.writeFile(fileName, Buffer.from(arrayBuffer));
};

const createFolder = async (folderName) => {
  const folderPath = path.join(process.cwd(), folderName);
  try {
    await fs.access(folderPath);
    //folder exists
  } catch (error) {
    await fs.mkdir(folderPath);
    //folder doesn't exist
  }
};

const savePokemonStats = async (folderName, pokemonStatsObject) => {
  let statsString = "";
  for (const stat of pokemonStatsObject) {
    statsString += `${stat.stat.name} : ${stat.base_stat}\n`;
  }
  await createFolder(folderName);
  const folderPath = path.join(process.cwd(), folderName, "stats.txt");
  await fs.writeFile(folderPath, statsString);
};

const savePokemonArtwork = async (folderName, pokemonSpritesObject) => {
  const url = pokemonSpritesObject.other["official-artwork"].front_default;
  const response = await fetch(url);

  const arrayBuffer = await response.arrayBuffer();
  await createFolder(folderName);
  const filePath = path.join(process.cwd(), folderName, "artwork.png");
  await saveImageFile(filePath, arrayBuffer);
};

const savePokemonSprites = async (folderName, pokemonSpritesObject) => {
  let spritesPromises = [];
  let spritesNames = [];

  for (const [name, url] of Object.entries(pokemonSpritesObject)) {
    if (!url) continue;
    if (name === "other" || name === "versions") continue;
    spritesPromises.push(fetch(url).then((res) => res.arrayBuffer()));
    spritesNames.push(name);
  }
  spritesPromises = await Promise.all(spritesPromises);
  await createFolder(folderName);
  for (let i = 0; i < spritesPromises.length; i++) {
    const filePath = path.join(
      process.cwd(),
      folderName,
      `${spritesNames[i]}.png`
    );
    await saveImageFile(filePath, spritesPromises[i]);
    console.log(`Saved: ${filePath}`);
  }
};

const parseOptions = async (pokemonObject, optionsObject) => {
  const options = optionsObject.options;
  const pokemonName = pokemonObject.name;

  if (options.includes("Stats")) {
    await savePokemonStats(pokemonName, pokemonObject.stats);
  }

  if (options.includes("Sprites")) {
    await savePokemonSprites(pokemonName, pokemonObject.sprites);
  }

  if (options.includes("Artwork")) {
    await savePokemonArtwork(pokemonName, pokemonObject.sprites);
  }
};

export { parseOptions };
