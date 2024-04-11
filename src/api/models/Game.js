const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'games'
  }
);

const Game = mongoose.model('Game', gameSchema, 'games');

module.exports = Game;
