import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { MenuIcon, XIcon } from '@heroicons/react/outline'; // Removed BellIcon
import { Link, useLocation } from 'react-router-dom';
import logo from "../../src/assets/images/Adulis_logo.png";
import { useDispatch } from 'react-redux';
import { onLogout } from '../api/auth'; // Removed fetchProtectedInfo and onLogin
import { unauthenticateUser } from '../redux/slices/authSlice';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const initialNavigation = [
  { name: 'Home', href: '/shipper', current: true },
  { name: 'Bids', href: '/shipper_bids', current: false },
  { name: 'Message', href: '/message', current: false },
  { name: 'Create', href: '/createshipment', current: false },
  { name: 'Trucks', href: '/trucks', current: false }, // Added Truck navigation item
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#', onClick: 'logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ShipperNavigation = () => {
  const [navigation, setNavigation] = useState(initialNavigation);
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState(''); // State for storing the username
  
  const handleNavigationClick = (clickedItem) => {
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.name === clickedItem.name,
    }));
    setNavigation(updatedNavigation);
  };

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

  // Fetch the username from localStorage when the component mounts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.username) {
      setUsername(userData.username);
    }
  }, []);

  return (
    <Disclosure as="header" className="bg-main-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-main-700 lg:px-8">
            <div className="relative h-16 flex justify-between">
              <div className="relative z-10 px-2 flex lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="h-16 w-auto sm:h-20 sm:w-auto md:h-24 md:w-auto lg:h-28 lg:w-auto mt-4"
                    src={logo}
                    alt="Adulis"
                  />
                </div>
              </div>
              <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-main-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                <div className="flex items-center text-white">
                  <span className="mr-2">{username || 'User'}</span> {/* Display username */}
                </div>
                <Menu as="div" className="flex-shrink-0 relative ml-4">
                  <div className="flex items-center">
                    <Menu.Button className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                              onClick={() => handleUserNavigationClick(item)}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block py-2 px-4 text-sm text-gray-700'
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
            </div>
            <nav className="sm:hidden lg:py-2 lg:flex lg:space-x-8 px-2 flex items-center justify-center" aria-label="Global">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => handleNavigationClick(item)}
                  className={classNames(
                    location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-main-600 hover:text-white',
                    'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium'
                  )}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="hidden pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  onClick={() => handleNavigationClick(item)}
                  className={classNames(
                    location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-main-600 hover:text-white',
                    'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium'
                  )}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ShipperNavigation;
