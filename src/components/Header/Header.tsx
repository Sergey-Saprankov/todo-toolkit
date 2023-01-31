import React from "react";
import { useAppDispatch } from "../../hooks/hooks";
import s from "./Header.module.scss";
import logo1 from "../../img/logo1.png";
import logo from "../../img/logo.svg";

export const Header = React.memo(() => {
  const dispatch = useAppDispatch();
  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div>
          <img className={s.logo1} src={logo1} alt="logo1" />
        </div>

        <div>
          <img className={s.logo} src={logo} alt="logo" />
        </div>
      </div>
      <div className={s.headerContainer}>
        <div>Task manager</div>

        <div>
          {/*{!isLoggedIn ? (*/}
          {/*  <NavLink to={"/login"} className={s.btn}>*/}
          {/*    Login*/}
          {/*  </NavLink>*/}
          {/*) : (*/}
          {/*  <button onClick={logOutHandler} className={s.btn}>*/}
          {/*    Logout*/}
          {/*  </button>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
});
