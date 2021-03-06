const bcrypt = require("bcryptjs");
const data = {
  users: [
    {
      name: "Jason",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "John",
      email: "john@email.com",
      password: bcrypt.hashSync("1234", 8),
    },
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      category: "Shirt",
      image: "/images/p1.jpg",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "High quality product",
    },
    {
      name: "Adidas Fit Shirt",
      category: "Shirt",
      image: "/images/p2.jpg",
      price: 100,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "High quality product",
    },
    {
      name: "Lacoste Slim Shirt",
      category: "Shirt",
      image: "/images/p3.jpg",
      price: 220,
      countInStock: 0,
      brand: "Lacoste",
      rating: 4.8,
      numReviews: 17,
      description: "High quality product",
    },
    {
      name: "Nike Slim Pant",
      category: "Pants",
      image: "/images/p4.jpg",
      price: 78,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "High quality product",
    },
    {
      name: "Puma Slim Pant",
      category: "Pants",
      image: "/images/p5.jpg",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "High quality product",
    },
    {
      name: "Adidas Slim Pant",
      category: "Pants",
      image: "/images/p6.jpg",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 50,
      description: "High quality product",
    },
  ],
};

module.exports = data;
