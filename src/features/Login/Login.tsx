import { FieldValues } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../common/hooks/hooks";
import { PATH } from "../../common/constants/path";
import { FormWrapper } from "../../common/components/Form/FormWrapper/FormWrapper";
import { Input } from "../../common/components/Input/Input";
import { CheckBox } from "../../common/components/CheckBox/CheckBox";
import { Button } from "../../common/components/Button/Button";
import eye from "../../assets/eye.svg";
import { formHandler } from "../../common/utils/formHandler";
import s from "./Login.module.scss";
import { loginTC } from "../../BLL/reducers/AuthReducerSlice";

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authData.isLoggedIn);
  const { errorEmail, errorPassword, handleSubmit, isValid, register } =
    formHandler("email", "password");
  const onSubmit = (data: FieldValues) => {
    dispatch(loginTC(data));
  };

  if (isLoggedIn) {
    return <Navigate to={PATH.todos} />;
  }

  return (
    <FormWrapper title={"Sign In"}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={"email"}
          label={"Email"}
          placeholder={"example@gmail.com"}
          register={register}
          error={errorEmail}
          nameForValidate={"email"}
        />

        <Input
          type={"password"}
          label={"Password"}
          altForIcon={"show password"}
          placeholder={"example12"}
          icon={eye}
          register={register}
          error={errorPassword}
          nameForValidate={"password"}
        />
        <CheckBox
          label={"Remember Me"}
          nameForValidate={"rememberMe"}
          register={register}
        />
        <Button isValid={isValid} title={"Sign In"} type={"submit"}></Button>
      </form>
    </FormWrapper>
  );
};
