const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleAuthError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req)

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
