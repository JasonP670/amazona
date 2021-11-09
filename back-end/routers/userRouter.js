const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const bcrypt = require("bcryptjs");

const userRouter = express.Router();
const addressRouter = require("./addressRouter");

const db = require("../models");
const { generateToken, isAuth } = require("../utils");
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
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
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

// userRouter.get(
//   "/address/:id",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     if (req.user.id === Number(req.params.id)) {
//       UserAddress.findAll({
//         include: [
//           {
//             model: User,
//             where: { id: req.params.id },
//           },
//         ],
//       }).then((results) => {
//         res.send(results);
//       });
//     } else {
//       res.status(401).json({ message: "Not Authorized" });
//     }
//   })
// );

// userRouter.post(
//   "/address",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     console.log(req.user);
//     const address = await UserAddress.create({
//       UserId: req.user.id,
//       full_name: req.body.fullName || req.user.name,
//       address_line1: req.body.addressLine1,
//       address_line2: req.body.addressLine2,
//       city: req.body.city,
//       postal_code: req.body.postalCode,
//       country: req.body.country,
//     });
//     res.status(200).send({
//       id: address.id,
//       fullName: address.full_name,
//       addressLine1: address.address_line1,
//       addressLine2: address.address_line2,
//       city: address.city,
//       postalCode: address.postal_code,
//       country: address.country,
//     });
//   })
// );

module.exports = userRouter;
