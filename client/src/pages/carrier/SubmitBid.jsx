import React, { useState, useEffect } from "react";
import SubmitBidModal from "../../components/SubmitBidModal"; // Adjust the path as necessary
import { onBidSubmit } from "../../api/bids";

const SubmitBid = ({ isOpen, onClose, shipmentId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.id) {
      setUserId(userData.id);
      setFormData((prevData) => ({
        ...prevData,
        carrier_id: userData.id
      }));
    }
  }, []);

  const [formData, setFormData] = useState({
    remark: "",
    amount: "",
    carrier_id: userId
  });

  const modalHandler = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      shipmentId,
    };
    await onBidSubmit(dataToSubmit);
    setFormData({
      remark: "",
      amount: "",
      carrier_id: userId // Ensure carrier_id is set
    });
    console.log("Submitted data:", dataToSubmit);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative w-96 rounded shadow-lg p-6 bg-white dark:bg-main-800">
          <button
            onClick={closeHandler}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <p className="text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
            Submit a Bid
          </p>
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="mt-4 flex flex-col">
              <label className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100">
                Remark
              </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                placeholder="Tell us how you can make it"
                className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-100 resize-none h-20 bg-gray-50 dark:bg-main-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
              />
            </div>
            <div className="mt-4 flex flex-col">
              <label className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100">
                Amount
              </label>
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter your amount"
                className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-100 bg-gray-50 dark:bg-main-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
              />
            </div>
            <button
              id="submit"
              type="submit"
              className="mt-5 focus:outline-none px-5 py-3 bg-main-700 dark:bg-main-500 hover:bg-opacity-90 rounded text-xs font-semibold leading-3 text-gray-100"
            >
              Submit
            </button>
          </form>
        </div>
        <SubmitBidModal isOpen={isModalOpen} onClose={closeHandler}>
          <p className="text-lg font-bold leading-none text-gray-800 dark:text-gray-100">
            Your Bid has been submitted!
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Thank you for your submission. We will get back to you soon.
          </p>
          <button
            onClick={closeHandler}
            className="mt-5 focus:outline-none px-5 py-3 bg-main-700 dark:bg-main-600 hover:bg-opacity-80 rounded text-xs font-semibold leading-3 text-gray-100"
          >
            Close
          </button>
        </SubmitBidModal>
      </div>
    </div>
  );
};

export default SubmitBid;
