const authMiddleware = (req, res, next) => {
  console.log("Hello from auth");
  next();
};

module.exports = authMiddleware;
