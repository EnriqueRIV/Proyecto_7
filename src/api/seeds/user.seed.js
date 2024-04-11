require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../../config/db');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const users = [
  {
    userEmail: 'adminAdmin@proyecto7.org',
    userName: 'adminAdmin',
    password: 'adminAdmin123',
    yearBirth: 1980,
    role: 'admin',
    imageAvatar: 'https://www.w3schools.com/w3images/avatar2.png'
  },
  {
    userEmail: 'user@proyecto7.org',
    userName: 'user',
    password: 'user123',
    yearBirth: 1950,
    role: 'user',
    imageAvatar: 'https://www.w3schools.com/w3images/avatar2.png'
  },
  {
    userEmail: 'userUser@proyecto7.org',
    userName: 'userUser',
    password: 'userUser123',
    yearBirth: 1970,
    role: 'user',
    imageAvatar: 'https://www.w3schools.com/w3images/avatar2.png'
  }
];

const userDocuments = users.map((user) => {
  user.password = bcrypt.hashSync(user.password, 10);
  return new User(user);
});

connectDB()
  .then(async () => {
    const allUsers = await User.find();

    if (allUsers.length) {
      await User.collection.drop();
    }
  })
  .catch((error) => console.log(`Error deleting user data: ${error}`))
  .then(async () => {
    await User.insertMany(userDocuments);
  })
  .catch((error) => console.log(`Error creating user data: ${error}`))
  .finally(() => mongoose.disconnect());
