const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();

const db = require("../models");
const generateToken = require("../utils");
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
    console.log(checkExist);
    if (checkExist) {
      res.status(400).send({ message: "Entry already exists with that email" });
    } else {
      console.log("made it through");
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      console.log("New users id: ", user.id);
      console.log(user);
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

userRouter.get(
  "/address",
  expressAsyncHandler(async (req, res) => {
    UserAddress.findAll().then((address) => res.json(address));
  })
);

userRouter.get(
  "/address/:id",
  expressAsyncHandler(async (req, res) => {
    UserAddress.findAll({
      include: [
        {
          model: User,
          where: { id: req.params.id },
        },
      ],
    }).then((results) => {
      res.send(results);
    });
  })
);

userRouter.post(
  "/address",
  expressAsyncHandler(async (req, res) => {
    const checkExist = await User.findOne({ where: { id: req.body.userId } });
    if (!checkExist) {
      res.status(404).send({ message: "That user doesn't seem to exist" });
    }
    const address = await UserAddress.create({
      UserId: req.body.userId,
      full_name: req.body.fullName,
      address_line1: req.body.addressLine1,
      address_line2: req.body.addressLine2,
      city: req.body.city,
      postal_code: req.body.postalCode,
      country: req.body.country,
    });
    console.log(address);
    res.status(200).send({
      id: address.id,
      fullName: address.full_name,
      addressLine1: address.address_line1,
      addressLine2: address.address_line2,
      city: address.city,
      postalCode: address.postal_code,
      country: address.country,
    });
  })
);

module.exports = userRouter;
