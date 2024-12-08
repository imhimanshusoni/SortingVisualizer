import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import HomePage from "./src/pages/homepage";
import About from "./src/pages/about";

const parent = document.getElementById("parent");
const root = ReactDOM.createRoot(parent);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <About />,
    },
  ]);
  return <RouterProvider router={router} />;
};

root.render(<App />);
