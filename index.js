const express = require("express");
const app = express();
const port = 4000;

const mongoose = require("mongoose");
const keyString = require("./_key"); // Local Only

mongoose
  .connect(keyString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("... Mongo DB connected ...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
