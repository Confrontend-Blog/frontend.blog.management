import { lazy, Suspense } from "react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/login-page.tsx";
// import "./index.css";
import UserInactive from "./pages/user-inactive/user-inactive.tsx";
import { AuthProvider } from "./providers/auth-conext.tsx";
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
  const { isLoading, token } = useAuthenticate();

  return (
    <AuthProvider accessToken={token}>
      <Routes>
        <Route path={RoutePaths.Inactive} element={<UserInactive />} />
        <Route path={RoutePaths.Login} element={<LoginPage />} />
        <Route
          path="*"
          element={
            isLoading ? (
              // TODO Loading spinner
              <div>Loading...</div>
            ) : token ? (
              <Suspense fallback={<div>Loading...</div>}>
                <App />
              </Suspense>
            ) : (
              <Navigate to={RoutePaths.Login} replace />
            )
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export { RootComponent };
