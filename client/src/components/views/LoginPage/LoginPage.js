import { React, useEffect } from "react";
import axios from "axios";
import passwordToToken from "../../../utils/jwt";

function LoginPage() {
  const test = () => {
    console.log(passwordToToken("jake1234!"));
    axios
      .post("/api/users/login", {
        email: "jake10@gmail.com",
        password: passwordToToken("jake1234!")
      })
      .then((res) => {
        console.log(res);
        return new Promise((resolve, reject) => resolve());
      })
      .then(() => {
        axios.get("/api/users/logout").then((res) => console.log(res));
      });
  };

  useEffect(() => {
    test();
  });

  return <div>LoginPage</div>;
}

export default LoginPage;
