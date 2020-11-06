const express = require("express");
const app = express();
const port = 4000;

const mongoose = require("mongoose");
const keyString = require("./_key"); // Local Only

const { User } = require("./model/User");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { auth } = require("./middleware/auth");
const jwt = require("jsonwebtoken");

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
  console.log("# req.body: ", req.body);
  const crrData = {
    ...req.body,
    password: jwt.verify(req.body.password, keyString.clientPassword).password
  };
  console.log("# crrData: ", crrData);
  const userMongooseModel = new User(crrData);
  userMongooseModel.save((err, userInfo) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ registerSuccess: false, error: err });
    } else {
      console.log(userInfo);
      return res.status(200).json({
        registerSuccess: true,
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
      return res.status(400).json({
        loginSuccess: false,
        message: "Email 정보가 존재하지 않습니다",
        error: err
      });
    } else {
      console.log(jwt.verify(req.body.password, keyString.clientPassword));
      userInfo.comparePassword(
        jwt.verify(req.body.password, keyString.clientPassword).password,
        (err, isMatched) => {
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
        }
      );
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

// Logout
// 쿠키 DB 토큰 전부 삭제
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) {
      return res.status(400).json({
        logoutSuccess: false,
        error: err
      });
    } else {
      res.status(200).send({
        logoutSuccess: true
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
