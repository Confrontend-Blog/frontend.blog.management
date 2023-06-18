import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "./auth-conext";
import { RoutePaths } from "../../root-component";

const ProtectedRoute = ({
  WrappedComponent,
}: {
  WrappedComponent: ReactNode;
}) => {
  const { token } = useContext(AuthContext);

  return token ? (
    <>{WrappedComponent}</>
  ) : (
    <Navigate to={RoutePaths.Login} replace />
  );
};

export default ProtectedRoute;
