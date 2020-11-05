import jwt from "jsonwebtoken";
import keyString from "../_key";

const passwordToToken = (userPassword) => {
  return jwt.sign({ password: userPassword }, keyString.clientPassword);
};

export default passwordToToken;
