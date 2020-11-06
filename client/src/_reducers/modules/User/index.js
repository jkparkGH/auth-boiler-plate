import {
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER
} from "../../../_actions/user/types";

export const User = (
  prevState = {
    isAuth: false
  },
  action
) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...prevState,
        loginSuccess: action.payload,
        isAuth: action.payload.hasOwnProperty("loginSuccess")
          ? action.payload.loginSuccess
          : false
      };
    case LOGOUT_USER:
      return {
        ...prevState,
        logoutSuccess: action.payload,
        isAuth: action.payload.hasOwnProperty("logoutSuccess")
          ? !action.payload.logoutSuccess
          : true
      };
    case REGISTER_USER:
      return { ...prevState, registerSuccess: action.payload };
    case AUTH_USER:
      return {
        ...prevState,
        userData: action.payload,
        isAuth: action.payload.hasOwnProperty("isAuth")
          ? action.payload.isAuth
          : false
      };
    default:
      return prevState;
  }
};
