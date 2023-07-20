import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../providers/auth-conext";
import { RoutePaths } from "../../root-component";

const ProtectedRoute = ({
  WrappedComponent,
}: {
  WrappedComponent: ReactNode;
}) => {
  const { accessToken } = useContext(AuthContext);

  return accessToken ? (
    <>{WrappedComponent}</>
  ) : (
    <Navigate to={RoutePaths.Login} replace />
  );
};

export default ProtectedRoute;
