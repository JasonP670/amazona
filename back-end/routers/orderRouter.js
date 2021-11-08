const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const orderRouter = express.Router();

const db = require("../models");
const { isAuth } = require("../utils");
const Order = db.Order;

orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.findAll();
    res.json(orders);
  })
);

orderRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    res.json(order);
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.totalPrice === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = await Order.create({
        UserId: req.user.id,
        address_id: req.body.addressId,
        items_price: req.body.itemsPrice,
        shipping_price: req.body.shippingPrice,
        tax_price: req.body.taxPrice,
        total_price: req.body.totalPrice,
        is_paid: req.body.isPaid,
        paid_at: req.body.paidAt,
      });
      res.send(order);
    }
  })
);

orderRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      order.update(req.body);
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

orderRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      order.destroy();
      res.send({ message: "Order deleted" });
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

module.exports = orderRouter;
