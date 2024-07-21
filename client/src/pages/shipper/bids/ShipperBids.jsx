import React from "react";

function ShipperBids() {
  return (
    <>
      <div className="bg-gray-100">
        <div className="px-4 py-12">
          <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[375px] mx-auto bg-white lg:px-10 md:px-6 px-4 py-12">
            <div className="md:flex justify-center gap-8 items-center">
              <div>
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/hair_care.png"
                  alt="hair_care"
                  className="lg:block md:hidden block"
                />
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/image%2015.png"
                  alt
                  className="lg:hidden md:block hidden"
                />
              </div>
              <div>
                <p className="lg:text-4xl md:text-3xl text-3xl font-semibold md:text-left text-center">
                  Hair Care
                </p>
                <div className="text-base text-gray-600 max-w-[624px] w-full mt-6 md:text-left text-center">
                  <p>
                    <span className="font-semibold">Carrier Name:</span> ABC Logistics
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold">Address:</span> 1234 Elm St, Springfield, IL
                  </p>
                  <p className="mt-4">
                    <span className="font-semibold">Amount:</span> $1,200
                  </p>
                </div>
                <div className="flex flex-row gap-4 mt-11 justify-center md:justify-start">
                  <button className="text-gray-800 text-base font-medium px-3 py-2 underline hover:text-gray-700 transition duration-300 ease-in-out">
                    See More
                  </button>
                  <button className="bg-blue-600 text-base font-medium w-full lg:max-w-[205px] px-3 py-2 text-white hover:bg-blue-500 transition duration-300 ease-in-out">
                    Accept
                  </button>
                  <button className="bg-gray-600 text-base font-medium w-full lg:max-w-[205px] px-3 py-2 text-white hover:bg-gray-500 transition duration-300 ease-in-out">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShipperBids;
