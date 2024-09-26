import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useState } from "react";
import { AuthFormErrorsType } from "../../helpers/types";
import {
  validateEmail,
  validatePassword,
  validateRepeatPassword,
  validateUsername,
} from "../../helpers/validation";

const getValidationFunction = (type: string) => {
  switch (type) {
    case "username":
      return validateUsername;
    case "email":
      return validateEmail;
    case "password":
      return validatePassword;
    default:
      return validateRepeatPassword;
  }
};

const initialState = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignUpForm = () => {
  const [inputs, onChange] = useForm(initialState);
  const [errors, setErrors] = useState<AuthFormErrorsType>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setErrors((prevState) => ({
      ...prevState,
      [e.target.id]: getValidationFunction(e.target.id)(
        e.target.value,
        inputs,
        setErrors,
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsArr = Object.values(errors);
    if (errorsArr.every((err) => err == null)) {
      console.log("valid");
    } else {
      console.log("invalid");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="ml-4" htmlFor="username">
          Username
        </label>
        <input
          value={inputs.username}
          onChange={handleChange}
          className={`hover:border-accent ${!inputs.username?.length ? "border-transparent" : errors.username ? "border-red-500" : "border-accent"} mt-2 w-full rounded-full border px-4 py-1 font-normal shadow-md transition-[border-color] focus:outline-none`}
          id="username"
          type="text"
        />
        <div className="mt-1 h-4 text-center text-red-600">
          {errors.username}
        </div>
      </div>
      <div className="flex flex-col">
        <label className="ml-4" htmlFor="email">
          Email
        </label>
        <input
          value={inputs.email}
          onChange={handleChange}
          className={`hover:border-accent ${!inputs.email?.length ? "border-transparent" : errors.email ? "border-red-500" : "border-accent"} mt-2 w-full rounded-full border px-4 py-1 font-normal shadow-md transition-[border-color] focus:outline-none`}
          id="email"
          type="email"
        />
        <div className="mt-1 h-4 text-center text-red-600">{errors.email}</div>
      </div>
      <div className="flex flex-col">
        <label className="ml-4" htmlFor="password">
          Password
        </label>
        <input
          value={inputs.password}
          onChange={handleChange}
          className={`hover:border-accent ${!inputs.password?.length ? "border-transparent" : errors.password ? "border-red-500" : "border-accent"} mt-2 w-full rounded-full border px-4 py-1 font-normal shadow-md transition-[border-color] focus:outline-none`}
          id="password"
          type="password"
        />
        <div className="mt-1 h-4 text-center text-red-600">
          {errors.password}
        </div>
      </div>
      <div className="flex flex-col">
        <label className="ml-4" htmlFor="repeatPassword">
          Repeat Password
        </label>
        <input
          value={inputs.repeatPassword}
          onChange={handleChange}
          className={`hover:border-accent ${!inputs.repeatPassword?.length ? "border-transparent" : errors.repeatPassword ? "border-red-500" : "border-accent"} mt-2 w-full rounded-full border px-4 py-1 font-normal shadow-md transition-[border-color] focus:outline-none`}
          id="repeatPassword"
          type="password"
        />
        <div className="mt-1 h-4 text-center text-red-600">
          {errors.repeatPassword}
        </div>
      </div>
      <p className="mt-2">
        Already have an account? Sign in{" "}
        <Link to="/sign-in" className="text-accent underline">
          here.
        </Link>
      </p>
      <button
        className="from-accent rounded-full bg-gradient-to-r to-blue-500 bg-[length:300%] px-5 py-2 shadow-md transition-[background-size] hover:bg-[length:100%]"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
