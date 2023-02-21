const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
const { handleAuthError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "super-secret"
    );
  } catch (err) {
    handleAuthError(res);
  }
  req.user = payload;
  next();
};
