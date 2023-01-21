const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const { handleError } = require("../utils/errors");

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleError(res);
  }
  req.user = payload;
  next();
};
