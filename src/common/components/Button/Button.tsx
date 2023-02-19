import React from "react";
import s from "./Button.module.scss";

type TypeButton = "button" | "submit" | "reset" | undefined;

type ButtonType = {
  title?: string;
  callBack?: () => void;
  isValid?: boolean;
  type?: TypeButton;
};

export const Button: React.FC<ButtonType> = React.memo(
  ({ title, callBack, type, isValid }) => {
    return (
      <button
        disabled={isValid ? !isValid : false}
        type={type ? type : undefined}
        onClick={callBack}
        className={s.btn}
      >
        {title}
      </button>
    );
  }
);
