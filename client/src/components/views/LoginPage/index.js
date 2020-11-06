import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user";
import passwordToToken from "../../../utils/passwordToToken";

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const reqData = {
      email: Email,
      password: passwordToToken(Password)
    };

    dispatch(loginUser(reqData)).then((res) => {
      if (res.payload.loginSuccess) {
        history.push("/");
      }
    });
  };

  useEffect(() => {});

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column"
        }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <button type="submit" style={{ marginTop: "12px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default withRouter(LoginPage);
