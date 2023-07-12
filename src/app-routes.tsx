import { Route, Routes } from "react-router-dom";

import withProtectedRoute from "./components/routing/with-protected-route";
import ContentTemplate from "./components/ui/layout/content-template";
import Articles from "./pages/articles/articles";
import Authors from "./pages/authors/authors";
import Composer from "./pages/composer/composer";
import Dashboard from "./pages/dashboard/dashboard";
import Settings from "./pages/settings/settings";
import { RoutePaths } from "./root-component";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={RoutePaths.Dashboard}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<Dashboard />} />
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
          <ContentTemplate
            WrappedComponent={
              <>
                <Messages />
              </>
            }
          />
        )}
      />
      <Route
        path={RoutePaths.Settings}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<Settings />} />
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
