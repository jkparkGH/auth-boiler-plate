import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../_actions/modules/user_actions";

function NavBar(props) {
  const style = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "10vh",
      listStyle: "none"
    },
    list: {
      padding: "20px"
    }
  };
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.data.logoutSuccess) {
        props.history.push("/");
      }
    });
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
    </button>
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
