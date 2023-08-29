import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddExpense from "./components/AddExpense";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/addexpense",
          element: <AddExpense />,
        },
        {
          path: "/leaderboard",
          element: <Leaderboard />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
