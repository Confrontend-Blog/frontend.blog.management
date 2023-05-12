import { Routes, Route } from "react-router-dom";
import Composer from "./pages/composer/composer";
import ContentTemplate from "./components/ui/layout/content-template";
import Articles from "./pages/articles/articles";
import withProtectedRoute from "./components/auth/with-protected-route";
import LoginPage from "./pages/login/login-page";
import Authors from "./pages/authors/authors";

export enum RoutePaths {
  Dashboard = "/dashboard",
  Composer = "/composer",
  Authors = "/authors",
  Articles = "/articles",
  Messages = "/messages",
  Settings = "/settings",
  Login = "/login",
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={RoutePaths.Login} element={<LoginPage />} />
      <Route
        path={RoutePaths.Dashboard}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<div>Dashboard</div>} />
        )}
      />
      <Route
        path={RoutePaths.Composer}
        element={withProtectedRoute(
          <ContentTemplate
            WrappedComponent={
              <Composer
                cancelCb={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
        )}
      />
      <Route
        path={RoutePaths.Authors}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<Authors />} />
        )}
      />
      <Route
        path={RoutePaths.Articles}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<Articles />} />
        )}
      />
      <Route
        path={RoutePaths.Messages}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<div>Messages</div>} />
        )}
      />
      <Route
        path={RoutePaths.Settings}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<div>Settings</div>} />
        )}
      />
      <Route
        path="*"
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<div>Dashboard</div>} />
        )}
      />
    </Routes>
  );
};

export default AppRoutes;
