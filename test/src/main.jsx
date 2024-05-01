
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "/routes/root";
import ErrorPage from "./error-page";
import { AuthenticationTitle } from "/routes/home";
import { Test2 } from "/routes/test2";
//import { NavbarMinimal } from "./components/Navbar";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Dashboard from "/routes/dashboard";
import Employees from "/routes/employees";
import Transactions from "/routes/transactions";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    //children: [],
  },
  {
    path: "employees",
    element: <Employees />,
    //children: [],
  },
  {
    path: "transactions",
    element: <Transactions />,
    //children: [],
  },
  {
    path: "home",
    element: <AuthenticationTitle />,
  },
  {
    path: "test2",
    element: <Test2 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);

