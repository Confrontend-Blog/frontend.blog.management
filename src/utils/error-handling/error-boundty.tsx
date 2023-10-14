import { Button } from "@Confrontend/ui-library";
import React, { Component, ReactElement } from "react";

import { RoutePaths } from "../../root-component";

type ErrorBoundaryProps = {
  children: ReactElement;
};

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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

  handleRedirectAndReload = () => {
    // Navigate to dashboard
    window.location.href = RoutePaths.Dashboard;
  };
}

export { ErrorBoundary };
