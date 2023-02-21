const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Unauthorized");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "super-secret",
    );
  } catch (err) {
    throw new UnauthorizedError("Unauthorized");
  }
  req.user = payload;
  next();
};
