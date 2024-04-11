require('dotenv').config();
const mongoose = require('mongoose');
const Console = require('../models/Console');
const { connectDB } = require('../../config/db');

const consoles = [
  {
    name: 'Xbox',
    games: []
  },
  {
    name: 'Nintendo Switch',
    games: []
  }
];

const consoleDocuments = consoles.map((console) => new Console(console));

connectDB()
  .then(async () => {
    const allConsoles = await Console.find();

    if (allConsoles.length) {
      await Console.collection.drop();
    }
  })
  .catch((error) => console.log(`Error deleting console data: ${error}`))
  .then(async () => {
    await Console.insertMany(consoleDocuments);
  })
  .catch((error) => console.log(`Error creating console data: ${error}`))
  .finally(() => mongoose.disconnect());
