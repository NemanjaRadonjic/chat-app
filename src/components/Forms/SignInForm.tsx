import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

const initialState = {
  emailOrUsername: "",
  password: "",
};

const SignInForm = () => {
  const [inputs, handleChange] = useForm(initialState);
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="ml-4" htmlFor="emailOrUsername">
          Email or Username
        </label>
        <input
          value={inputs.emailOrUsername}
          onChange={handleChange}
          className="hover:border-accent mt-2 w-full rounded-full border px-4 py-1 font-normal shadow-sm transition-[border-color] focus:outline-none"
          id="emailOrUsername"
          type="text"
        />
        <div className="mt-1 h-4 text-center text-red-600">
          This field is required
        </div>
      </div>

      <div className="flex flex-col">
        <label className="ml-4" htmlFor="password">
          Password
        </label>
        <input
          value={inputs.password}
          onChange={handleChange}
          className="hover:border-accent mt-2 w-full rounded-full border px-4 py-1 font-normal shadow-sm transition-[border-color] focus:outline-none"
          id="password"
          type="password"
        />
        <div className="mt-1 h-4 text-center text-red-600"></div>
      </div>

      <p className="mt-2">
        Don't have an account? Sign up{" "}
        <Link to="/sign-in" className="text-accent underline">
          here.
        </Link>
      </p>
      <button
        className="from-accent rounded-full bg-gradient-to-r to-blue-500 bg-[length:300%] px-5 py-2 shadow-md transition-[background-size] hover:bg-[length:100%]"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
