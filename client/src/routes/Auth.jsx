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

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/shipper" />}</>;
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
    element: <PrivateRoutes />,
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
        path: '/carrier',
        element: <CarrierHome />,
      },
      {
        path: '/carrier_bids',
        element: <CarrierBids />,
      },
      {
        path: '/shipper_bids',
        element: <ShipperBidsHome />,
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
