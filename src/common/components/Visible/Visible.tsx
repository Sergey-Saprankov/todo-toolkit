import React from "react";
import { setHide } from "../../../BLL/reducers/AppSlice";
import s from "./Visible.module.scss";
import visibleImg from "../../../assets/visible.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Visible = () => {
  const dispatch = useAppDispatch();
  const isHide = useAppSelector((state) => state.appData.isHide);
  return (
    <div
      onClick={() => dispatch(setHide(false))}
      className={
        isHide ? `${s.visibleContainer} ${s.isOpen}` : s.visibleContainer
      }
    >
      <img className={s.icon} src={visibleImg} alt="eye" />
    </div>
  );
};

export default Visible;
