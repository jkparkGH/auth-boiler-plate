const express = require("express");
const app = express();
const port = 4000;

const mongoose = require("mongoose");
const keyString = require("./_key"); // Local Only

const { User } = require("./model/User");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded 가져오기

app.use(bodyParser.json()); // application/json 가져오기

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
  res.send("# Hello World! #");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({
      success: true
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
