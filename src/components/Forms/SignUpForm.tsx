import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useState } from "react";
import { AuthFormErrorsType } from "../../helpers/types";
import {
  validateEmail,
  validatePassword,
  validateRepeatPassword,
} from "../../helpers/validation";
import { signUp } from "../../helpers/requests";

const getValidationFunction = (type: string) => {
  switch (type) {
    case "email":
      return validateEmail;
    case "password":
      return validatePassword;
    default:
      return validateRepeatPassword;
  }
};

const initialErrorState = {
  email: "",
  password: "",
  repeatPassword: "",
  main: null,
};

const SignUpForm = () => {
  const [inputs, onChange] = useForm();
  const [errors, setErrors] = useState<AuthFormErrorsType>(initialErrorState);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setErrors((prevState) => ({
      ...prevState,
      [e.target.id]: getValidationFunction(e.target.id)(
        e.target.value,
        inputs,
        setErrors,
      ),
      main: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsArr = Object.values(errors);
    const inputsArr = Object.values(inputs);

    if (inputsArr.some((input) => !input.length)) {
      setErrors((prevState) => ({
        ...prevState,
        main: "Please fill in all fields",
      }));
    } else if (errorsArr.every((err) => err == null)) {
      const response = await signUp(inputs.email, inputs.password);
      if (response.error) {
        setErrors((prevState) => ({
          ...prevState,
          main: response.error?.message,
        }));
      } else {
        navigate("/sign-in");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="ml-4" htmlFor="email">
          Email
        </label>
        <input
          value={inputs.email}
          onChange={handleChange}
          className={`hover:border-indigo-700 ${!inputs.email?.length ? "border-transparent" : errors.email ? "border-red-500" : "border-indigo-700"} mt-2 w-full rounded-full border px-4 py-1 font-normal shadow transition-[border-color] focus:outline-none`}
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
          className={`hover:border-indigo-700 ${!inputs.password?.length ? "border-transparent" : errors.password ? "border-red-500" : "border-indigo-700"} mt-2 w-full rounded-full border px-4 py-1 font-normal shadow transition-[border-color] focus:outline-none`}
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
          className={`hover:border-indigo-700 ${!inputs.repeatPassword?.length ? "border-transparent" : errors.repeatPassword ? "border-red-500" : "border-indigo-700"} mt-2 w-full rounded-full border px-4 py-1 font-normal shadow transition-[border-color] focus:outline-none`}
          id="repeatPassword"
          type="password"
        />
        <div className="mt-1 h-4 text-center text-red-600">
          {errors.repeatPassword}
        </div>
      </div>
      <p className="mb-4 mt-4 text-center text-sm">
        Already have an account? Sign in{" "}
        <Link to="/sign-in" className="text-indigo-700 underline">
          here.
        </Link>
      </p>
      <button
        className="rounded-full bg-gradient-to-r from-indigo-700 to-blue-500 bg-[length:300%] px-5 py-2 shadow-md transition-[background-size] duration-300 hover:bg-[length:100%]"
        type="submit"
      >
        Sign Up
      </button>
      <div className="mt-1 h-4 text-center text-red-600">{errors.main}</div>
    </form>
  );
};

export default SignUpForm;
