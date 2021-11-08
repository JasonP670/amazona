const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");

const productRouter = express.Router();

const db = require("../models");
const Product = db.Product;

productRouter.get("/", (req, res) => {
  Product.findAll().then((products) => res.json(products));
});

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.bulkCreate(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

module.exports = productRouter;
