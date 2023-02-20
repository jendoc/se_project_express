const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");

require("dotenv").config();

const { PORT = 3001 } = process.env;
const app = express();
app.use(cors({ origin: "*" }));

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (res) => {
    console.log("connected to DB");
  },
  (err) => {
    console.log("DB error", err);
  }
);

const routes = require("./routes");
const { createUser, login } = require("./controllers/users");
const { handleNotFoundError } = require("./utils/errors");

app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.post("/signin", login);
app.post("/signup", createUser);
app.use(auth, (next) => {
  handleNotFoundError(res);
  next();
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
