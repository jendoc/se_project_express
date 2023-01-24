const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleAuthError } = require("../utils/errors");

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError(res);
  }
  req.user = payload;
  return next();
};
