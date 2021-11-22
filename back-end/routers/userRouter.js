const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();
const addressRouter = require("./addressRouter");

const db = require("../models");
const { generateToken, isAuth } = require("../utils");
const { createUser } = require("../contexts/users");
const User = db.User;
const UserAddress = db.User_address;

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

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const checkExist = await User.findOne({ where: { email: req.body.email } });
    if (checkExist) {
      res.status(400).send({ message: "Entry already exists with that email" });
    } else {
      const { name, email, password: rawPassword } = req.body;
      const user = await createUser({ name, email, rawPassword });
      res.send({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    }
  })
);

userRouter.use("/address", addressRouter);

module.exports = userRouter;
