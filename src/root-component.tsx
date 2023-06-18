import { lazy,Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login/login-page.tsx";
// import "./index.css";
import UserInactive from "./pages/user-inactive/user-inactive.tsx";

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
  return (
    <Routes>
      <Route path={RoutePaths.Inactive} element={<UserInactive />} />
      <Route path={RoutePaths.Login} element={<LoginPage />} />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        }
      />
    </Routes>
  );
};

export { RootComponent };
