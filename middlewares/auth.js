const jwt = require("jsonwebtoken");

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

const handleAuthError = (res) => {
  res.status(401).send({ message: "Authorization Error" });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  next();
};
