import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Outlet } from "react-router-dom";
import Error from "../components/Error";

const ProtectedRoute = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  if (!currentUser) {
    return <Error>You are not signed in</Error>;
  }
  return <Outlet />;
};

export default ProtectedRoute;
