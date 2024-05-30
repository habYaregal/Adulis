import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/authentication/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/authentication/Register";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};
const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    element: <RestrictedRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
const Auth = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Auth;
