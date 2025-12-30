import React, { Component } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Checkout from "./Checkout";
import AddProfessional from "./AddProfessional";
const Layout = () => (
  <div>
    <NavigationBar />
    <div style={{ paddingTop: "70px" }}></div>
    <Outlet />
  </div>
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // default route (/)
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "checkout", element: <Checkout /> },
      { path: "add-professional", element: <AddProfessional /> },
      { path: "*", element: <h2>404 - Page Not Found</h2> }, // fallback
    ],
  },
]);
export default function MainComponent() {
  return <RouterProvider router={router} />;
}
