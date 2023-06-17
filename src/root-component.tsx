import React from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// import "./index.css";
import UserInactive from "./pages/user-inactive/user-inactive.tsx";
const App = lazy(() => import("./App"));

const RootComponent = () => {
  return (
    <Routes>
      <Route path="/inactive" element={<UserInactive />} />
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
