const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleAuthError } = require("../utils/errors");

module.exports = (req, res, next) => {
  console.log(req)
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError(res);
  }
  req.user = payload;
  next();
};
