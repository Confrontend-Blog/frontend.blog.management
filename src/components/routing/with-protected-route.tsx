import { ReactNode } from "react";

import ProtectedRoute from "./protected-route";

const withProtectedRoute = (Component: ReactNode) => {
  return <ProtectedRoute WrappedComponent={Component} />;
};

export default withProtectedRoute;
