import { ReactElement } from "react";

import { ErrorBoundary } from "./error-boundty";

const ErrorBoundaryWrapper = ({ children }: { children: ReactElement }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWrapper;
