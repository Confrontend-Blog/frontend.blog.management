import { Button } from "@Confrontend/ui-library";
import React, { Component, ReactNode } from "react";

import { RoutePaths } from "../../root-component";
import logger from "./logger";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error(`Error caught by Error Boundary: ${error.toString()}`);
    logger.debug(`Additional info: ${errorInfo.componentStack}`);
  }

  handleRedirectAndReload = () => {
    window.location.href = RoutePaths.Dashboard;
  };

  render() {
    if (this.state.hasError) {
      // TODO improve UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <Button onClick={this.handleRedirectAndReload}>
            Click here to go back to dashboard
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryWrapper = ({ children }: { children: ReactNode }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWrapper;
