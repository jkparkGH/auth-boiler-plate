import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../_actions/user";

function NavBar() {
  // const state = store.getState();
  const { isAuth } = useSelector(
    (state) => ({
      isAuth: state.User.isAuth
    }),
    shallowEqual
  );
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
      console.log("# dispatch logoutUser res.payload # ", res.payload);
      // if (res.payload.logoutSuccess) {}
    });
  };

  const onCheckState = () => {
    // console.log("### state :", state);
    console.log("### isAuth :", isAuth);
  };

  const renderingList = [
    { auth: null, tag: <Link to="/">Landing</Link> },
    { auth: false, tag: <Link to="/login">Login</Link> },
    { auth: false, tag: <Link to="/register">Register</Link> },
    {
      auth: true,
      tag: (
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
      )
    },
    { auth: null, tag: <button onClick={onCheckState}>checkState</button> }
  ];

  return (
    <ul style={style.container}>
      {renderingList.map((item, index) => {
        return (
          (item.auth === null || item.auth === isAuth) && (
            <li key={`renderingList ${index}`} style={style.list}>
              {item.tag}
            </li>
          )
        );
      })}
    </ul>
  );
}

export default NavBar;
