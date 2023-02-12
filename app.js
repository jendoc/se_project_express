const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");

require("dotenv").config();

const { PORT = 3001 } = process.env;
const app = express();

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
app.use(routes);
app.post("/signin", login);
app.post("/signup", createUser);
app.use(auth, (next) => {
  handleNotFoundError(res);
  next();
});

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({ origin: allowedOrigins }));

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
