import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "../pages/authentication/Login";
import { useSelector } from "react-redux";
import LandingAuth from "./Landing";
import ChooseUser from "../pages/landing/ChooseUser";
import ShipperRegister from "../pages/authentication/ShipperRegister";
import ShipperHome from "../pages/shipper/Home";
import NewShipment from "../pages/shipper/new_shipment/NewShipment";
import CarrierRegister from "../pages/authentication/CarrierRegister";
import CarrierHome from "../pages/carrier/Home";


const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};
const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to="/shipper" />}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingAuth/>,
  },
  {
    path: "/chooseuser",
    element: <ChooseUser/>,
  },
  {
    path:"/carrier",
    element:<CarrierHome/>
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path:"/shipper",
        element:<ShipperHome/>
      },
      {
        path:"/createshipment",
        element:<NewShipment/>
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
        path: "/shipper_register",
        element: <ShipperRegister/>,
      },
      {
        path: "/carrier_register",
        element: <CarrierRegister/>,
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
