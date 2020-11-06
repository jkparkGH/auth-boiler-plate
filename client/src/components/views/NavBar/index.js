import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../_actions/user";
import { store } from "../../../_store";
function NavBar() {
  const state = store.getState();

  const style = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "7vh",
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    list: {
      padding: "0 10px"
    }
  };
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    dispatch(logoutUser()).then((res) => {
      console.log("logout res.payload", res.payload);
      if (res.payload.logoutSuccess) {
      }
    });
  };

  const onCheckState = () => {
    console.log("### state :", state.User.userData);
  };
  const renderingList = [
    <Link to="/">Landing</Link>,
    <Link to="/login">Login</Link>,
    <Link to="/register">Register</Link>,
    <button
      style={{
        display: "flex",
        flexDirection: "column"
      }}
      type="button"
      onClick={onLogoutHandler}
    >
      Logout
    </button>,
    <button onClick={onCheckState}>checkState</button>
  ];

  const liElements = renderingList.map((item, index) => {
    return (
      <li key={`renderingList ${index}`} style={style.list}>
        {item}
      </li>
    );
  });
  return <ul style={style.container}>{liElements}</ul>;
}

export default NavBar;
