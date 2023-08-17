import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/login-page";
// import "./index.css";
import UserInactive from "./pages/user-inactive/user-inactive";
import { AuthProvider } from "./providers/auth-conext";
import { useAuthenticate } from "./utils/auth/useAuthenticate";
import { isObjectEmpty } from "./utils/object-utils";

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
  const user = useAuthenticate();
  console.log(123, user);

  return (
    <AuthProvider user={user}>
      <Routes>
        <Route path={RoutePaths.Inactive} element={<UserInactive />} />
        <Route path={RoutePaths.Login} element={<LoginPage />} />
        <Route
          path="*"
          element={
            !user || isObjectEmpty(user) ? (
              <Navigate to={RoutePaths.Login} replace />
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <App />
              </Suspense>
            )
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export { RootComponent };
