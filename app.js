const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(
  "mongodb://localhost:27017/wtwr_db",
  (res) => {
    console.log("connected to DB", res);
  },
  (err) => {
    console.log("DB error", err);
  },
);

const routes = require("./routes");
const { createUser, login } = require("./controllers/users");
const { handleNotFoundError } = require("./utils/errors");

app.use(express.json());
app.use(routes);
app.use(cors());
app.post("/signin/", login);
app.post("/signup/", createUser);
app.use((req, res) => {
  const err = new Error("Not found");
  handleNotFoundError(err, req, res);
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
