import { LOGIN_USER, REGISTER_USER } from "../../../_actions/types";

export const userReducer = (prevState = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...prevState, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...prevState, registerSuccess: action.payload };
    default:
      return prevState;
  }
};
