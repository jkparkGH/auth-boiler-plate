import {
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER
} from "../../../_actions/user/types";

export const User = (prevState = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...prevState, loginSuccess: action.payload };
    case LOGOUT_USER:
      return { ...prevState, logoutSuccess: action.payload };
    case REGISTER_USER:
      return { ...prevState, registerSuccess: action.payload };
    case AUTH_USER:
      return { ...prevState, userData: action.payload };
    default:
      return prevState;
  }
};
