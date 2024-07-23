import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { onLogout } from '../api/auth';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

import logo from "../assets/images/Adulis-logo.png";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const initialMenuItems = [
  { name: "Home", link: "/carrier" },
  { name: "Bids", link: "/carrier_bids" },
  { name: "Message", link: "/space" },
  { name: "Create", link: "/new_truck" },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#", onClick: "logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const CarrierNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [style, setStyle] = useState(
    initialMenuItems.map((item) => location.pathname === item.link)
  );
  const [dropDown, setDropDown] = useState(true);
  const [text, setText] = useState(
    initialMenuItems.find((item) => location.pathname === item.link)?.name ||
      initialMenuItems[0].name
  );

  useEffect(() => {
    const activeIndex = initialMenuItems.findIndex(
      (item) => item.link === location.pathname
    );
    setStyle(style.map((_, i) => i === activeIndex));
    setText(initialMenuItems[activeIndex]?.name || initialMenuItems[0].name);
  }, [location]);

  const selected = (index) => {
    setStyle(style.map((_, i) => i === index));
  };

  const setSelectedText = (txt) => {
    setText(txt);
    setDropDown(true);
  };
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleUserNavigationClick = (item) => {
    if (item.onClick === 'logout') {
      logout();
    }
  };
  const [username, setUsername] = useState('');
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.username) {
      setUsername(userData.username);
    }
  }, []);

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className="bg-white rounded shadow-lg py-5 px-7">
        <nav className="flex justify-between">
          <div className="flex items-center space-x-3 lg:pr-16 pr-6">
            <img src={logo} className="h-16" alt="Logo" />
          </div>
          {/* For medium and plus sized devices */}
          <ul className="hidden md:flex flex-auto justify-center items-center text-2xl space-x-2">
            {initialMenuItems.map((item, index) => (
              <li key={index} onClick={() => selected(index)}>
                <Link
                  to={item.link}
                  className={`${
                    style[index]
                      ? "text-white bg-main-600"
                      : "text-gray-600 border border-white bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-6 py-3.5 font-normal text-sm leading-4 shadow-md rounded`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* User menu */}
          <div className="flex items-center space-x-5">
          <div className="flex items-center text-main-500">
                  <span className="mr-2">{username || 'User'}</span> {/* Display username */}
                </div>
            <Menu as="div" className="flex-shrink-0 relative ml-4">
              <div className="flex items-center">
                <Menu.Button className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default link behavior
                            handleUserNavigationClick(item);
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block py-2 px-4 text-sm text-gray-700"
                          )}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </nav>
        {/* For small sized devices */}
        <div className="block md:hidden w-full mt-5">
          <div
            onClick={() => setDropDown(!dropDown)}
            className="bg-gray-50 shadow rounded flex justify-between items-center cursor-pointer"
          >
            <p className="px-4 py-3 text-sm leading-3 tracking-normal font-normal text-gray-600">
              {text}
            </p>
            <div className="cursor-pointer text-gray-600 mr-4">
              {dropDown ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-up"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="6 15 12 9 18 15" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-down"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
            </div>
          </div>
          <ul
            className={`${
              dropDown ? "hidden" : "block"
            } flex flex-col w-full mt-2 space-y-2`}
          >
            {initialMenuItems.map((item, index) => (
              <li key={index} onClick={() => setSelectedText(item.name)}>
                <Link
                  to={item.link}
                  className={`${
                    style[index]
                      ? "text-white bg-main-600"
                      : "text-gray-600 border border-white bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-4 py-3 font-normal text-sm leading-3 shadow-md rounded`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarrierNav;
