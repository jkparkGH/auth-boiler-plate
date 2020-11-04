const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const keyString = require("../_key"); // Local Only

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 20
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 80
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre("save", function (next) {
  var userModel = this;
  // 비밀번호 암호화
  if (userModel.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(userModel.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        userModel.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  // plainPassword 를 암호화 해서 - DB 비밀번호 랑 일치하는지 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatched) {
    if (err) return callback(err);
    callback(null, isMatched);
  });
};

userSchema.methods.generateToken = function (callback) {
  const userModel = this;
  // jsonwebtoken 이용해서 토큰생성
  console.log("##this._id ##", userModel._id);
  /* 
    // 동작하는 시점의 userSchema 값인가??
    ## this ## {
      role: 0,
      _id: 5fa22d009e4c362ba627d652,
      name: 'jake4',
      email: 'email4@gmail.com',
      password: '$2b$10$PToXgjy5afJkKZ4d7KwcWu/81HvS45i3bZstKhnsqEV8Lr2sFc7ty',
      __v: 0,
      token: 'eyJhbGciOiJIUzI1NiJ9.NWZhMjJkMDA5ZTRjMzYyYmE2MjdkNjUy.QJa-vvwH9AH8YfoNiuHAW1Euujtpec3Zq3fXc6SZ61Q'
    }
  */
  const token = jwt.sign({ _id: userModel._id }, keyString.token);
  const testVerify = jwt.verify(token, keyString.token);
  console.log(`# Token: ${token}\n# testVerify: ${JSON.stringify(testVerify)}`);

  userModel.token = token;
  userModel.save((err, user) => {
    if (err) {
      return callback(err);
    } else {
      callback(null, user);
    }
  });
};

userSchema.statics.findByToken = function ({ token }, callback) {
  const userModel = this;
  console.log(`# token: ${token} \n# keysTring: ${keyString.token}`);
  jwt.verify(token, keyString.token, (err, decoded) => {
    console.log("# decoded: ", decoded);
    if (err) throw err;
    userModel.findOne({ _id: decoded, token: token }, (err, userModel) => {
      if (err) {
        return callback(err);
      } else {
        callback(null, userModel);
      }
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
