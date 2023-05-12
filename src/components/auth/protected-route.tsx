import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../app-routes";
import AuthContext from "./auth-conext";

const ProtectedRoute = ({
  WrappedComponent,
}: {
  WrappedComponent: ReactNode;
}) => {
  const { token } = useContext(AuthContext);

  return true ? (
    <>{WrappedComponent}</>
  ) : (
    <Navigate to={RoutePaths.Login} replace />
  );
};

export default ProtectedRoute;
