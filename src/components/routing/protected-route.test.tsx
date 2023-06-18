import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import AuthContext from "../../providers/auth-conext";
import ProtectedRoute from "./protected-route";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(() => null),
}));

describe('ProtectedRoute', () => {
  const WrappedComponent = <div>Test Component</div>;

  it('should render wrapped component when user is authenticated', () => {
    render(
      <AuthContext.Provider value={{ accessToken: 'token123' }}>
        <Router>
          <ProtectedRoute WrappedComponent={WrappedComponent} />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', () => {
    const { container } = render(
      <AuthContext.Provider value={{ accessToken: '' }}>
        <Router>
          <ProtectedRoute WrappedComponent={WrappedComponent} />
        </Router>
      </AuthContext.Provider>
    );

    expect(container).not.toHaveTextContent('Test Component');
    expect(Navigate).toHaveBeenCalled();
  });
});
