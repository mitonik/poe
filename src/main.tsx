import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const PLAINS_OF_EIDOLON_PATH = "/poe/";

const router = createBrowserRouter([
  {
    path: PLAINS_OF_EIDOLON_PATH,
    element: <App />,
  },
  {
    path: "*",
    element: <Navigate to={PLAINS_OF_EIDOLON_PATH} replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
