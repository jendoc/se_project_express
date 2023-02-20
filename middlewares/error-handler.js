const BadRequestError = require("../errors/bad-request");
const UnauthorizedError = require("../errors/unauthorized");
const ForbiddenError = require("../errors/forbidden");
const NotFoundError = require("../errors/not-found");
const ConflictError = require("../errors/conflict");

module.exports = (err, req, res, next) => {
  console.error(err);
  if (err instanceof BadRequestError) {
    return res.status(400).send({ message: "Bad request" });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  if (err instanceof ForbiddenError) {
    return res.status(403).send({ message: "Forbidden" });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: "Not found" });
  }
  if (err instanceof ConflictError) {
    return res.status(409).send({ message: "Conflict error" });
  }
  return res.status(500).send({ message: "An error occured on the server" });
};
