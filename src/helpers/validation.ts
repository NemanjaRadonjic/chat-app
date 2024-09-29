import { AuthFormErrorsType, AuthFormType } from "./types";

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const validateEmail = (email: string) => {
  if (!email.length) {
    return "This field is required.";
  } else if (!emailRegex.test(email)) {
    return "Enter a valid email address.";
  }
  return null;
};

export const validatePassword = (
  password: string,
  inputs: AuthFormType,
  setErrors?: React.Dispatch<React.SetStateAction<AuthFormErrorsType>>,
) => {
  const { repeatPassword } = inputs;
  if (!password.length) {
    return "This field is required.";
  } else if (password.length < 8) {
    return "Password is too short.";
  } else if (password.length > 21) {
    return "Password is too long.";
  } else if (password !== repeatPassword && repeatPassword.length) {
    if (setErrors) {
      setErrors((prevState) => ({
        ...prevState,
        repeatPassword: "Passwords don't match.",
      }));
    }
  } else if (password === repeatPassword && repeatPassword.length) {
    if (setErrors) {
      setErrors((prevState) => ({
        ...prevState,
        repeatPassword: null,
      }));
    }
  }
  return null;
};

export const validateRepeatPassword = (
  repeatPassword: string,
  inputs: AuthFormType,
) => {
  const { password } = inputs;
  if (!repeatPassword.length) {
    return "This field is required.";
  } else if (password !== repeatPassword) {
    return "Passwords don't match.";
  }
  return null;
};
