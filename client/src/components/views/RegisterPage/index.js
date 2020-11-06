import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import passwordToToken from "../../../utils/passwordToToken";
import {
  registerUser
  // loginUser
} from "../../../_actions/user";

function RegisterPage({ history }) {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onPasswordConfirmHandler = (e) => {
    setPasswordConfirm(e.currentTarget.value);
  };

  const validationUserData = () => {
    if (!Name) {
      alert("이름을 입력해 주세요");
      return false;
    } else if (!Email) {
      alert("이메일을 입력해 주세요");
      return false;
    } else if (!Password) {
      alert("비밀번호를을 입력해 주세요");
      return false;
    } else if (!PasswordConfirm) {
      alert("비밀번호 확인을 입력해 주세요");
      return false;
    } else if (Password !== PasswordConfirm) {
      alert("비밀번호가 일치하지 않습니다");
      return false;
    } else {
      return true;
    }
  };

  const onRegisterSubmitHandler = (e) => {
    e.preventDefault();
    if (!validationUserData()) return;
    const reqData = {
      name: Name,
      email: Email,
      password: passwordToToken(Password)
    };
    dispatch(registerUser(reqData)).then((res) => {
      if (res.payload.success) {
        history.push("/login");
      }
    });
  };
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
        onSubmit={onRegisterSubmitHandler}
      >
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Password confirm</label>
        <input
          type="password"
          value={PasswordConfirm}
          onChange={onPasswordConfirmHandler}
        />
        <button type="submit" style={{ marginTop: "12px" }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
