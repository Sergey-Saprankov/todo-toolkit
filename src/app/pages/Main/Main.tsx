import React from "react";
import s from "./Main.module.scss";
import Sidebar from "../../../common/widget/Sidebar/Sidebar";

const Main = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      Main
    </div>
  );
};

export default Main;
