import { React, useEffect } from "react";
import axios from "axios";
import passwordToToken from "../../../utils/jwt";

function RegisterPage() {
  const register = () => {
    if (true) return;
    axios
      .post("/api/users/register", {
        email: "jake10@gmail.com",
        password: passwordToToken("jake1234!"),
        name: "jakekk"
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      RegisterPage
      <button type="button" onClick={register}>
        register
      </button>
    </div>
  );
}

export default RegisterPage;
