const express = require("express");
const app = express();
const data = require("./data.js");

const userRouter = require("./routers/userRouter");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (!product) {
    res.status(404).send({ message: "Product Not Found" });
  }
  res.status(200).send(product);
});

app.get("/api/products", (req, res) => {
  res.status(200).send(data.products);
});

app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
