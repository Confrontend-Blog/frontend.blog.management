import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../app-routes";

const ProtectedRoute = ({
  WrappedComponent,
}: {
  WrappedComponent: ReactNode;
}) => {
  // const { token } = useContext(AuthContext);

  return true ? (
    <>{WrappedComponent}</>
  ) : (
    <Navigate to={RoutePaths.Login} replace />
  );
};

export default ProtectedRoute;
