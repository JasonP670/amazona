const express = require("express");
const expressAsyncHandler = require("express-async-handler");

const addressRouter = express.Router();

const db = require("../models");
const { generateToken, isAuth } = require("../utils");
const User = db.User;
const UserAddress = db.User_address;

addressRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.user.isAdmin) {
      UserAddress.findAll().then((address) => res.json(address));
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  })
);

addressRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.user.id === Number(req.params.id)) {
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
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }
  })
);

addressRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.user);
    const address = await UserAddress.create({
      UserId: req.user.id,
      full_name: req.body.fullName || req.user.name,
      address_line1: req.body.addressLine1,
      address_line2: req.body.addressLine2,
      city: req.body.city,
      postal_code: req.body.postalCode,
      country: req.body.country,
    });
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

module.exports = addressRouter;
