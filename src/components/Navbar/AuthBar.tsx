import { Link } from "react-router-dom";

const AuthBar = () => {
  return (
    <ul className="flex flex-row">
      <li>
        <Link to="sign-in">Sign In</Link>
      </li>
      <li>
        <Link to="sign-up">Sign Out</Link>
      </li>
    </ul>
  );
};

export default AuthBar;
