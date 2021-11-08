const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (authorization) {
    const token = req.headers.authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid token",
          });
        }
        req.user = decoded;
        next();
      }
    );
  } else {
    res.status(401).json({
      message: "No Token",
    });
  }
};

module.exports = { generateToken, isAuth };
