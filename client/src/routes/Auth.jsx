import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'; // Import CookiesProvider
import { useSelector } from 'react-redux';
import Login from '../pages/authentication/Login';
import LandingAuth from './Landing';
import ChooseUser from '../pages/landing/ChooseUser';
import ShipperRegister from '../pages/authentication/ShipperRegister';
import ShipperHome from '../pages/shipper/Home';
import NewShipment from '../pages/shipper/new_shipment/NewShipment';
import CarrierRegister from '../pages/authentication/CarrierRegister';
import CarrierHome from '../pages/carrier/Home';
import CarrierBids from '../pages/carrier/CarrierBids';
import ShipperBidsHome from '../pages/shipper/bids/Home';
import NewTruck from '../pages/carrier/NewTruck';
import Trucks from '../pages/shipper/trucks/Trucks.jsx'
import ShipperMessage from '../pages/shipper/messages/Home.jsx';

const PrivateRoutes = ({ allowedRoles }) => {
  const { isAuth, user } = useSelector((state) => state.auth);

  return (
    <>
      {isAuth && user && allowedRoles.includes(user.user_type) ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

const RestrictedRoutes = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  if (isAuth) {
    if (user && user.user_type === 'carrier') {
      return <Navigate to="/carrier" />;
    } else if (user && user.user_type === 'shipper') {
      return <Navigate to="/shipper" />;
    }
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingAuth />,
  },
  {
    path: '/chooseuser',
    element: <ChooseUser />,
  },
  {
    element: <PrivateRoutes allowedRoles={['shipper']} />, // Only allow shippers
    children: [
      {
        path: '/shipper',
        element: <ShipperHome />,
      },
      {
        path: '/createshipment',
        element: <NewShipment />,
      },
      {
        path: '/shipper_bids',
        element: <ShipperBidsHome />,
      },
      {
        path: '/trucks',
        element: <Trucks />
      },
      {
        path: '/message',
        element: <ShipperMessage />
      },
    ],
  },
  {
    element: <PrivateRoutes allowedRoles={['carrier']} />, // Only allow carriers
    children: [
      {
        path: '/carrier',
        element: <CarrierHome />,
      },
      {
        path: '/carrier_bids',
        element: <CarrierBids />,
      },
      {
        path: '/new_truck',
        element: <NewTruck />,
      },
    ],
  },
  {
    element: <RestrictedRoutes />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/shipper_register',
        element: <ShipperRegister />,
      },
      {
        path: '/carrier_register',
        element: <CarrierRegister />,
      },
    ],
  },
]);


const Auth = () => {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  );
};

export default Auth;
