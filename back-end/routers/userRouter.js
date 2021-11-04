const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");

const userRouter = express.Router();

const db = require("../models");
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

module.exports = userRouter;
