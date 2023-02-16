import React from "react";
import s from "./Sidebar.module.scss";
import { Logo } from "../../components/Logo/Logo";
import logo from "../../../assets/logo.svg";
import { TodosLink } from "../../components/TodosLink/TodosLink";

export const Sidebar = () => {
  return (
    <div className={s.container}>
      <div className={s.innerWrapper}>
        <div className={s.logoContainer}>
          <Logo img={logo} />
        </div>
        <TodosLink />
        <div></div>
      </div>
    </div>
  );
};
