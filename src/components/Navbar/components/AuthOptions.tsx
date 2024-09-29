import { Link } from "react-router-dom";

const AuthOptions = () => {
  return (
    <>
      <li>
        <Link
          className="duration-400 transition-colors hover:text-blue-700"
          to="sign-in"
        >
          Sign In
        </Link>
      </li>
      <li>
        <Link
          className="duration-400 transition-colors hover:text-blue-700"
          to="sign-up"
        >
          Sign Up
        </Link>
      </li>
    </>
  );
};

export default AuthOptions;
