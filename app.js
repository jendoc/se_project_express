const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(
  "mongodb://localhost:27017/wtwr_db",
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => {
    console.log("DB error", e);
  }
);

const routes = require("./routes");
const { createUser, login } = require("./controllers/user");

app.use(express.json());
app.use(routes);
app.use(cors());
app.post('/signin', login);
app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
