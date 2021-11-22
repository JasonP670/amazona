const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");

async function createUser({ name, email, rawPassword }) {
  return User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(rawPassword, 8),
  });
}

module.exports = { createUser };
