const express = require("express");
const app = express();
const port = 4000;

const mongoose = require("mongoose");
const keyString = require("./_key"); // Local Only

const { User } = require("./model/User");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded 가져오기
app.use(bodyParser.json()); // application/json 가져오기
app.use(cookieParser());

// DB init
mongoose
  .connect(keyString.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("[ ..... Mongo DB connected ..... ]");
  })
  .catch((err) => console.log(err));

// home
app.get("/", (req, res) => {
  res.send("### Welcome to Auth Tutorial ###");
});

// register
app.post("/api/users/register", (req, res) => {
  const userMongooseModel = new User(req.body);
  userMongooseModel.save((err, userInfo) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err });
    } else {
      console.log(userInfo);
      return res.status(200).json({
        success: true,
        result: userInfo
      });
    }
  });
});

// login
app.post("/api/users/login", (req, res) => {
  // 1. DB에서 login email 찾기
  // 2. 요청된 이메일이 DB에 있다면, 비밀번호 일치 여부 확인
  // 3. 비밀번호 일치 하는 경우, 인증 토큰 생성
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "Email 정보가 존재하지 않습니다",
        error: err
      });
    } else {
      userInfo.comparePassword(req.body.password, (err, isMatched) => {
        if (!isMatched) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 일치하지 않습니다",
            error: err
          });
        } else {
          userInfo.generateToken((err, user) => {
            if (err) {
              return res.status(400).send(err);
            } else {
              // 토큰을 사용자 side에 저장해두어야 함
              res.cookie("__x_auth", user.token).status(200).json({
                loginSuccess: true,
                userId: user._id
              });
            }
          });
        }
      });
    }
  });
});

// auth
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    _id: req.user._id,
    isAdmin: req.user.role !== 0,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
