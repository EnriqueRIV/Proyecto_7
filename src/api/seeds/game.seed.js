require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../../config/db');
const Game = require('../models/Game');

const games = [
  {
    name: 'Hallo',
    category: 'adventure'
  },
  {
    name: 'Hallo 2',
    category: 'sport'
  },
  {
    name: 'Super Mario',
    category: 'adventure'
  },
  {
    name: 'Mario Kart',
    category: 'sport'
  },
  {
    name: 'Dragonball',
    category: 'action'
  }
];

const gameDocumnets = games.map((game) => new Game(game));

connectDB()
  .then(async () => {
    const allGames = await Game.find();

    if (allGames.length) {
      await Game.collection.drop();
    }
  })
  .catch((error) => console.log(`Error deleting game data: ${error}`))
  .then(async () => {
    await Game.insertMany(gameDocumnets);
  })
  .catch((error) => console.log(`Error creating game data: ${error}`))
  .finally(() => mongoose.disconnect());
