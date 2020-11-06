import axios from "axios";
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../types";

export const loginUser = (reqUserData) => {
  const request = axios.post("/api/users/login", reqUserData).then((res) => {
    console.log(`## user_actions _ ${LOGIN_USER} : `, res.data);
    return res.data;
  });

  return {
    type: LOGIN_USER,
    payload: request
  };
};

export const logoutUser = () => {
  const request = axios.get("/api/users/logout").then((res) => {
    console.log(`## user_actions _ ${LOGOUT_USER} : `, res.data);
    return res.data;
  });

  return {
    type: LOGOUT_USER,
    payload: request
  };
};

export const registerUser = (reqUserData) => {
  const request = axios.post("/api/users/register", reqUserData).then((res) => {
    console.log(`##  user_actions _ ${REGISTER_USER} : `, res.data);
    return res.data;
  });

  return {
    type: REGISTER_USER,
    payload: request
  };
};
