const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("No Token Found");
    error.statusCode = 402;
    throw error;
  }

  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "thisisunhackablee");
  } catch (error) {
    error.statusCode = 402;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 402;
    throw error;
  }
  console.log(decodedToken);
  req.userId = decodedToken.userId;
  next();
};
