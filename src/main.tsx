// import "systemjs";

import  { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
// import "./index.css";
import UserInactive from "./pages/user-inactive/user-inactive.tsx";
const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(

    <BrowserRouter>
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
    </BrowserRouter>

);
