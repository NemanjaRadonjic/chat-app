import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Outlet } from "react-router-dom";
import Error from "../components/Error";

const ProtectedRoute = ({ fromUser }: { fromUser?: boolean }) => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  if (fromUser) {
    if (currentUser) {
      return <Error>You are signed in.</Error>;
    }
    return <Outlet />;
  } else {
    if (currentUser) {
      return <Outlet />;
    }
    return <Error>You are not signed in</Error>;
  }
};

export default ProtectedRoute;
