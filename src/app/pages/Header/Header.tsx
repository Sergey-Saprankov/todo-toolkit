import React from "react";
import s from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/hooks";
import Logo from "../../../common/components/Logo/Logo";
import logo from "../../../assets/logo.svg";
import { Button } from "../../../common/components/Button/Button";
import { logoutTC } from "../../../BLL/reducers/AuthReducerSlice";
import { Navigate, useLocation } from "react-router-dom";
import { PATH } from "../../../common/constants/path";

export const Header = React.memo(() => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);
  const location = useLocation();
  const disabled = location.pathname === PATH.login;
  const loginHandler = () => {
    return <Navigate to={PATH.login} />;
  };
  console.log(disabled);
  const logoutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <Logo img={logo} />

          {isLoggedIn ? (
            <Button callBack={logoutHandler} title={"Log out"} />
          ) : (
            <Button
              isValid={!disabled}
              callBack={loginHandler}
              title={"Sign In"}
            />
          )}
        </div>
      </div>
    </div>
  );
});
