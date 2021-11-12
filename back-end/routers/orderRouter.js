const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const orderRouter = express.Router();

const db = require("../models");
const { isAuth } = require("../utils");
const Order = db.Order;
const ProductOrder = db.ProductOrder;
const Product = db.Product;

orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.findAll();
    const products = await ProductOrder.findAll();
    res.json({ orders, products });
  })
);
orderRouter.get(
  "/abc",
  expressAsyncHandler(async (req, res) => {
    const orders = await ProductOrder.findAll({
      include: [
        {
          model: Order,
          as: "order",
          attributes: ["id", "status", "createdAt", "updatedAt"],
        },
      ],
    });
    res.json(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findOne({
      where: { id: req.params.id },
      include: Product,
    });
    if (order) {
      res.send(order);
    }
    res.status(404).send({ message: "Order not found" });
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
        payment_method: req.body.paymentMethod,
        is_paid: req.body.isPaid,
        paid_at: req.body.paidAt,
      });

      for (let i = 0; i < req.body.cart.length; i++) {
        await ProductOrder.create({
          order_id: order.id,
          product_id: req.body.cart[i].product,
          quantity: req.body.cart[i].qty,
          price: req.body.cart[i].price,
        });
      }

      const found = await Order.findOne({
        where: { id: order.id },
        include: Product,
      });
      if (found) {
        res.send(found);
      }
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
