import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },{
          path:'/signup',
          element:<Signup/>
        },{
          path:'/signin',
          element:<Signin/>
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
