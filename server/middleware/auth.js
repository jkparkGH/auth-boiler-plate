const { User } = require("../model/User");

let auth = function (req, res, next) {
  // 1. client cookie 에서 token을 가져옴
  // 2. token 복호화 후 유저를 찾음
  // 3. 일치하는 유저가 있으면 인증 True / 아니면 False
  const token = req.cookies.__x_auth;
  User.findByToken({ token }, function (err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      console.log(user);
      return res.status(401).json({
        isAuth: false,
        error: true
      });
    }
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
