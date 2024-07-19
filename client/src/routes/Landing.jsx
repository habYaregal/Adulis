import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Landing from "../pages/landing/Landing";
import Users from "../pages/landing/Users";
import Testimony from "../pages/landing/Testimonials";
import Features from "../pages/landing/Features";
import Contact from "../pages/landing/Contact";

const LandingAuth = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
  
      </Routes>
    </>
  );
};
export default LandingAuth;
