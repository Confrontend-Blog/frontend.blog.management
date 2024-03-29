import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../providers/auth-context";
import { RoutePaths } from "../../root-component";

const ProtectedRoute = ({
  WrappedComponent,
}: {
  WrappedComponent: ReactNode;
}) => {
  const { user } = useContext(AuthContext);

  return user ? (
    <>{WrappedComponent}</>
  ) : (
    <Navigate to={RoutePaths.Login} replace />
  );
};

export default ProtectedRoute;
