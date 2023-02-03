import React from "react";
import { Spin } from "antd";
import s from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={s.container}>
      <Spin size={"large"} />
    </div>
  );
};

export default Loader;
