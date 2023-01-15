const express = require("express");

const mongoose = require("mongoose");

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

app.use((req, res, next) => {
  req.user = {
    _id: "63c06d177cc381fab9bb4c2c",
  };
  next();
});

const routes = require("./routes");

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
