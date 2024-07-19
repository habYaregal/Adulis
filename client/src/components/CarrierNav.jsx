import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Adulis-logo.png";

const CarrierNav = () => {
  const initialMenuItems = [
    { name: "Home", link: "/carrier" },
    { name: "Bids", link: "/arts" },
    { name: "Message", link: "/space" },
    { name: "Create", link: "/game" },
  ];

  const [style, setStyle] = useState(
    initialMenuItems.map((_, index) => index === 0)
  );
  const [dropDown, setDropDown] = useState(true);
  const [text, setText] = useState(initialMenuItems[0].name);

  const selected = (index) => {
    setStyle(style.map((_, i) => i === index));
  };

  const setSelectedText = (txt) => {
    setText(txt);
    setDropDown(true);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className="bg-white rounded shadow-lg py-5 px-7">
        <nav className="flex justify-between">
          <div className="flex items-center space-x-3 lg:pr-16 pr-6">
            <img src={logo} className="h-16" />
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
          <div className=" flex space-x-5 justify-center items-center pl-2">
            <div className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 3C6.44772 3 6 3.44772 6 4V5H18V4C18 3.44772 17.5523 3 17 3H7ZM5 5V4C5 2.34315 6.34315 1 8 1H16C17.6569 1 19 2.34315 19 4V5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V7C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H5ZM5 7H19V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V7Z"
                  fill="#1F2937"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11H15C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9H9Z"
                  fill="#1F2937"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 13C8.44772 13 8 13.4477 8 14C8 14.5523 8.44772 15 9 15H15C15.5523 15 16 14.5523 16 14C16 13.4477 15.5523 13 15 13H9Z"
                  fill="#1F2937"
                />
              </svg>
            </div>
            <div className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 7C19 4.79086 17.2091 3 15 3H9C6.79086 3 5 4.79086 5 7V21C5 21.5523 5.44772 22 6 22H10C10.5523 22 11 21.5523 11 21V15H13V21C13 21.5523 13.4477 22 14 22H18C18.5523 22 19 21.5523 19 21V7ZM17 7H7V20H9V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V20H17V7ZM15 7H9C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5H15C15.5523 5 16 5.44772 16 6C16 6.55228 15.5523 7 15 7Z"
                  fill="#1F2937"
                />
              </svg>
            </div>
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
            className={` ${
              dropDown ? "hidden" : "block"
            } flex flex-col w-full mt-2 space-y-2`}
          >
            {initialMenuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedText(item.name);
                  selected(index);
                }}
              >
                <Link
                  to={item.link}
                  className={`${
                    style[index]
                      ? "text-white bg-main-600"
                      : "text-gray-600 border border-white bg-gray-50"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}
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
