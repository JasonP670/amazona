const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const orderRouter = express.Router();

const db = require("../models");
const { isAuth } = require("../utils");
const Order = db.Order;
const ProductOrder = db.ProductOrder;
const Product = db.Product;
const User = db.User;
const { User_address } = db;

orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.findAll();
    const products = await ProductOrder.findAll();
    res.json({ orders, products });
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.totalPrice == 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      console.log("new entry here");
      const order = await Order.create({
        UserId: req.user.id,
        address_id: req.body.addressId,
        items_price: req.body.itemsPrice,
        shipping_price: req.body.shippingPrice,
        tax_price: req.body.taxPrice,
        total_price: req.body.totalPrice,
        payment_method: req.body.paymentMethod,
        is_paid: req.body.isPaid,
        paid_at: req.body.paidAt,
      });
      console.log("here1");
      console.log(order);

      for (let i = 0; i < req.body.cart.length; i++) {
        await ProductOrder.create({
          order_id: order.id,
          product_id: req.body.cart[i].product,
          quantity: req.body.cart[i].qty,
          price: req.body.cart[i].price,
        });
      }
      console.log("here2");

      const found = await Order.findOne({
        where: { id: order.id },
        include: Product,
      });
      console.log("here3");
      console.log(found);
      if (found) {
        res.send(found);
      }
    }
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
    });
    res.send(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findOne({
      where: { id: req.params.id, UserId: req.user.id },
      include: [Product, User, User_address],
    });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    console.log(paymentResult);
    const order = await Order.findByPk(req.params.id);
    if (order) {
      const updatedOrder = await Order.update(
        {
          is_paid: true,
          paid_at: Date.now(),
          payment_result: paymentResult,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

orderRouter.put(
  "/:id",
  isAuth,
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
