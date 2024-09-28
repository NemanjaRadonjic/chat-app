import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Outlet } from "react-router-dom";
import Error from "../components/Error";

const ProtectedRoute = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  if (!currentUser) {
    return <Error msg="You are not signed in" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
