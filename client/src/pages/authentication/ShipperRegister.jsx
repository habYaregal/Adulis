import React, { useState } from "react";
import { onRegistration } from "../../api/auth";
import { useDispatch } from "react-redux";
import {authenticateUser} from '../../redux/slices/authSlice'
const ShipperRegister = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    region: "",
    city: "",
    password: "",
    confirmPassword: "",
    userType:"shipper"
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
    { value: 'Adiss Ababa', label: 'Addis Ababa' },
    { value: 'Diredawa', label: 'Dire Dawa' },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const dispatch=useDispatch();

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
      dispatch(authenticateUser())
      localStorage.setItem('isAuth', 'true')
    } catch (error) {
      // setError(error.response.data.errors[0].msg);
      // setSuccess("");
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="text-center bg-gradient-to-br from-main-500 to-main-400 min-h-[160px] sm:p-6 p-4">
        <h4 className="sm:text-3xl text-2xl font-bold text-white">Create your account as a shipper</h4>
      </div>
      <div className="mx-4 mb-4 -mt-16">
        <form onSubmit={submitHandler} className="max-w-4xl mx-auto bg-white shadow-[0_2px_18px_-3px_rgba(6,81,237,0.4)] sm:p-8 p-4 rounded-md">
          <div className="grid md:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <label className="text-sm mb-2 block">First Name</label>
              <input
                name="firstName"
                type="text"
                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-main-500"
                placeholder="Enter name"
                value={values.firstName}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Last Name</label>
              <input
                name="lastName"
                type="text"
                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-main-500"
                placeholder="Enter last name"
                value={values.lastName}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Email Id</label>
              <input
                name="email"
                type="text"
                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-main-500"
                placeholder="Enter email"
                value={values.email}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Mobile No.</label>
              <input
                name="number"
                type="tel"
                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-main-500"
                placeholder="Enter mobile number"
                value={values.number}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Region</label>
              <select
                name="region"
                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-main-500 appearance-none focus:outline-none focus:ring-2 focus:ring-main-500"
                value={values.region}
                onChange={onChange}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm mb-2 block">City</label>
              <input
                name="city"
                type="text"
                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-main-500"
                placeholder="Enter City"
                value={values.city}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-main-500"
                placeholder="Enter password"
                value={values.password}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="bg-gray-100 w-full text-sm px-4 py-3 rounded-md outline-main-500"
                placeholder="Enter confirm password"
                value={values.confirmPassword}
                onChange={onChange}
              />
            </div>
          </div>
          <span className="text-red-600 font-semibold">{error}</span>
          <span className="text-green-600 font-semibold">{success}</span>
          <div className="!mt-10">
            <button
              type="submit"
              className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded-md text-white bg-main-500 hover:bg-main-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipperRegister;
