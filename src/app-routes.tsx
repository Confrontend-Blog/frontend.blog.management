import { Route, Routes } from "react-router-dom";

import withProtectedRoute from "./components/routing/with-protected-route";
import ContentTemplate from "./components/ui/layout/content-template";
import Articles from "./pages/articles/articles";
import Authors from "./pages/authors/authors";
import Composer from "./pages/composer/composer";
import Dashboard from "./pages/dashboard/dashboard";
import Messages from "./pages/messages/messages";
import Settings from "./pages/settings/settings";
import { RoutePaths } from "./root-component";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={RoutePaths.Dashboard}
        element={withProtectedRoute(
          <ContentTemplate
            WrappedComponent={<Dashboard />}
            title={"Dashboard"}
          />
        )}
      />
      <Route
        path={RoutePaths.Composer}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<Composer />} title={"Composer"} />
        )}
      />
      <Route
        path={RoutePaths.Authors}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<Authors />} title={"Authors"} />
        )}
      />
      <Route
        path={RoutePaths.Articles}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<Articles />} title={"Articles"} />
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
            title={"Messages"}
          />
        )}
      />
      <Route
        path={RoutePaths.Settings}
        element={withProtectedRoute(
          <ContentTemplate WrappedComponent={<Settings />} title={"Settings"} />
        )}
      />
      <Route
        path="*"
        element={withProtectedRoute(
          <ContentTemplate
            WrappedComponent={<Dashboard />}
            title={"Dashboard"}
          />
        )}
      />
    </Routes>
  );
};

export default AppRoutes;
