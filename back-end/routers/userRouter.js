const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

const db = require("../models");
const generateToken = require("../utils");
const User = db.User;

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res, next) => {
    const createdUsers = await User.bulkCreate(data.users);
    res.send({ createdUsers });
  })
);

userRouter.get("/", (req, res) => {
  User.findAll().then((users) => res.json(users));
});

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
        res.send({
          id: user.dataValues.id,
          name: user.dataValues.name,
          email: user.dataValues.email,
          isAdmin: user.dataValues.isAdmin,
          token: generateToken(user.dataValues),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

module.exports = userRouter;
