const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");
const { createUser, login } = require("./controllers/users");
const {
  validateUserLogin,
  validateUserBody,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

require("dotenv").config();

const { PORT = 3001 } = process.env;
const app = express();
app.use(cors({ origin: "*" }));

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (res) => {
    console.log("connected to DB", res);
  },
  (err) => {
    console.log("DB error", err);
  }
);

const routes = require("./routes");

app.use(express.json());
app.use(requestLogger);
app.use(routes);

// ! Remove after passing review
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
// ! ---------------------------

app.post("/signin", validateUserLogin, login);
app.post("/signup", validateUserBody, createUser);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
