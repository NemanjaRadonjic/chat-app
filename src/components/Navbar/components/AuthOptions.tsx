import { Link } from "react-router-dom";

const AuthOptions = () => {
  return (
    <>
      <li>
        <Link to="sign-in">Sign In</Link>
      </li>
      <li>
        <Link to="sign-up">Sign Up</Link>
      </li>
    </>
  );
};

export default AuthOptions;
