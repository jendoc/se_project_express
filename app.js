const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
app.use(cors());
app.post("/signin", login);
app.post("/signup", createUser);
app.use((req, res) => {
  handleNotFoundError(res);
});

 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', "http://localhost:3000");
   next();
 })

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
