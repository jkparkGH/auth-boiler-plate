import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../../_actions/user";

export default function HocAuth(SpecificComponent, option, adminRoute = null) {
  // option = null | true | false
  // null 아무나
  // true 로그인한 유저 only
  // false 로그인 안한 유저 only
  const dispatch = useDispatch();
  const AuthenticationCheck = ({ history }) => {
    useEffect(() => {
      dispatch(authUser()).then((res) => {
        if (!res.payload.isAuth) {
          if (option) {
            history.push("/login");
          }
        } else {
          if (adminRoute && !res.payload.isAdmin) {
            history.push("/");
          } else {
            if (option === false) {
              history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  };
  return AuthenticationCheck;
}
