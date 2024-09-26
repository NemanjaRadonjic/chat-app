import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import supabase from "../../supabase/client";
import { useState } from "react";

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

const SignInForm = () => {
  const [inputs, onChange] = useForm();
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email.length || !inputs.password.length) {
      setError("Please fill in all fields.");
    } else {
      const response = await signIn(inputs.email, inputs.password);
      if (response.error) {
        setError(response.error.message);
      } else {
        navigate("/chats");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setError("");
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
          className="hover:border-accent mt-2 w-full rounded-full border px-4 py-1 font-normal shadow-sm transition-[border-color] focus:outline-none"
          id="email"
          type="text"
        />
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
      <div className="mt-1 h-4 text-center text-red-600">{error}</div>
    </form>
  );
};

export default SignInForm;
