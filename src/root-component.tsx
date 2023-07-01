import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/login-page.tsx";
// import "./index.css";
import UserInactive from "./pages/user-inactive/user-inactive.tsx";
import { useAuthenticate } from "./utils/auth/useAuthenticate.ts";

/** Security: Only fetch application code  chunk for authenticated user. */
const App = lazy(() => import("./App"));

export enum RoutePaths {
  Dashboard = "/dashboard",
  Composer = "/composer",
  Authors = "/authors",
  Articles = "/articles",
  Messages = "/messages",
  Settings = "/settings",
  Login = "/login",
  Inactive = "/inactive",
}

const RootComponent = () => {
  const { accessToken, isLoading } = useAuthenticate();

  return (
    <Routes>
      <Route path={RoutePaths.Inactive} element={<UserInactive />} />
      <Route
        path={RoutePaths.Login}
        element={<LoginPage isAuthenticated={!!accessToken} />}
      />
      <Route
        path="*"
        element={
          isLoading ? (
            // TODO Loading spinner
            <div>Loading...</div>
          ) : accessToken ? (
            <Suspense fallback={<div>Loading...</div>}>
              <App accessToken={accessToken} />
            </Suspense>
          ) : (
            <Navigate to={RoutePaths.Login} replace />
          )
        }
      />
    </Routes>
  );
};

export { RootComponent };
