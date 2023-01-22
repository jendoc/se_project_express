const ERROR_CODES = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  ServerError: 500,
};

const handleError = (err, req, res, next) => {
  if (err.statusCode === 200 || err.statusCode === 201) {
    res.status(err.statusCode).send({ message: `${err.statusCode} Success` });
  } else if (err.name === "ValidationError" || err.name === "CastError") {
    res
      .status(ERROR_CODES.BadRequest)
      .send({ message: `${ERROR_CODES.BadRequest} Invalid input` });
  } else if (err.statusCode === 401) {
    res
      .status(ERROR_CODES.Unauthorized)
      .send({ message: `${ERROR_CODES.Unauthorized} Unauthorized` });
  } else if (err.statusCode === 403) {
    res
      .status(ERROR_CODES.Forbidden)
      .send({ message: `${ERROR_CODES.Forbidden} Forbidden` });
  } else if (err.name === "DocumentNotFoundError") {
    res
      .status(ERROR_CODES.NotFound)
      .send({ message: `${ERROR_CODES.NotFound} Not found` });
  } else if (err.statusCode === 409) {
    res.status(ERROR_CODES.Conflict).send({
      message: `${ERROR_CODES.Conflict} That email address is already associated with an account`,
    });
  } else {
    res.status(ERROR_CODES.ServerError).send({
      message: `${ERROR_CODES.ServerError} Something went wrong`,
    });
  }
};

module.exports = {
  ERROR_CODES,
  handleError,
};
