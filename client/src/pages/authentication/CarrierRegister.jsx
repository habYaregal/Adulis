import React, { useState } from "react";
import { onRegistration } from "../../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from '../../redux/slices/authSlice';

const CarrierRegister = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    region: "",
    city: "",
    password: "",
    confirmPassword: "",
    tinNumber:0,
    userType: "carrier"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const regions = [
    { value: 'Tigray', label: 'Tigray' },
    { value: 'Afar', label: 'Afar' },
    { value: 'Amhara', label: 'Amhara' },
    { value: 'Oromia', label: 'Oromia' },
    { value: 'Somali', label: 'Somali' },
    { value: 'Benshangul Gumuz', label: 'Benshangul Gumuz' },
    { value: 'South Ethiopia', label: 'South Ethiopia' },
    { value: 'Harari', label: 'Harari' },
    { value: 'Gambela', label: 'Gambela' },
    { value: 'Sidama', label: 'Sidama' },
    { value: 'South West Ethiopia', label: 'South West Ethiopia' },
    { value: 'Central Ethiopia', label: 'Central Ethiopia' },
    { value: 'Addis Ababa', label: 'Addis Ababa' },
    { value: 'Dire Dawa', label: 'Dire Dawa' },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      setSuccess("");
      return;
    }
    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        region: "",
        city: "",
        password: "",
        confirmPassword: "",
      });
      dispatch(authenticateUser());
      localStorage.setItem('isAuth', 'true');
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <div aria-label="form" tabIndex="0" className="focus:outline-none xl:w-10/12 w-full px-8">
      <div className="xl:px-24">
        <div className="px-5 py-4 bg-main-300 rounded-lg flex items-center justify-between mt-7">
          <div className="flex items-center">
            <div tabIndex="0" className="focus:outline-none flex-shrink-0">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/form_layout_wizard2-svg1.svg" alt="lock" />
            </div>
            <p tabIndex="0" className="focus:outline-none text-3xl text-white pl-3">
              Register as a carrier
            </p>
          </div>
        </div>
        <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
          <div className="w-80">
            <div className="flex items-center">
              <h1 tabIndex="0" className="focus:outline-none text-xl font-medium pr-2 leading-5 text-gray-800">
                Personal Information
              </h1>
            </div>
            <p tabIndex="0" className="focus:outline-none mt-4 text-sm leading-5 text-gray-600">
              Information about the section could go here and a brief description of how this might be used.
            </p>
          </div>
          <div>
            <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
              <div className="md:w-64">
                <label className="text-sm leading-none text-gray-800" id="firstName">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="firstName"
                  placeholder="John"
                />
              </div>
              <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                <label className="text-sm leading-none text-gray-800" id="lastName">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="lastName"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="md:flex items-center lg:ml-24 mt-8">
              <div className="md:w-64">
                <label className="text-sm leading-none text-gray-800" id="emailAddress">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="emailAddress"
                  placeholder="youremail@example.com"
                />
              </div>
              <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                <label className="text-sm leading-none text-gray-800" id="phone">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="number"
                  value={values.number}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="phone"
                  placeholder="123-1234567"
                />
              </div>
            </div>
            <div className="md:flex items-center lg:ml-24 mt-8">
              <div className="md:w-64">
                <label className="text-sm leading-none text-gray-800" id="region">
                  Region
                </label>
                <select
                  name="region"
                  value={values.region}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="region"
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                <label className="text-sm leading-none text-gray-800" id="city">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="city"
                  placeholder="Enter City"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
          <div className="w-80">
            <div className="flex items-center">
              <h1 tabIndex="0" className="focus:outline-none text-xl font-medium pr-2 leading-5 text-gray-800">
                Security
              </h1>
            </div>
            <p tabIndex="0" className="focus:outline-none mt-4 text-sm leading-5 text-gray-600">
              Information about the section could go here and a brief description of how this might be used.
            </p>
          </div>
          <div>
            <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
              <div className="md:w-64">
                <label className="text-sm leading-none text-gray-800" id="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                <label className="text-sm leading-none text-gray-800" id="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="confirmPassword"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div className="md:flex items-center lg:ml-24 mt-8">
              <div className="md:w-64">
                <label className="text-sm leading-none text-gray-800" id="recoverEmail">
                  TIN Number
                </label>
                <input
                  type="number"
                  name="TINnumber"
                  value={values.recoverEmail}
                  onChange={onChange}
                  tabIndex="0"
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  placeholder="Your TIN number"
                />
              </div>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="flex justify-end mt-8">
        <button
          onClick={submitHandler}
          className="bg-main-500 hover:bg-main-700 text-white font-bold py-2 px-4 mb-6 rounded"
        >
          Register
        </button>
        </div>
      </div>
    </div>
  );
};

export default CarrierRegister;
