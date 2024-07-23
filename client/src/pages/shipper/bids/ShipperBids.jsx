import React, { useEffect, useState } from "react";
import { onShipperBidGet, onUpdateBidStatus } from "../../../api/bids";

function ShipperBids() {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const { data } = await onShipperBidGet();
        setBids(data);
      } catch (error) {
        console.error("Error fetching bids:", error);
        setError("Failed to fetch bids");
      }
    };
    
    fetchBids();
  }, []);

  const handleAccept = async (id) => {
    try {
      await onUpdateBidStatus(id, 'accepted');
      setBids((prevBids) =>
        prevBids.map((bid) =>
          bid.id === id ? { ...bid, status: "accepted" } : bid
        )
      );
    } catch (error) {
      setError("Failed to update bid status");
    }
  };

  const handleReject = async (id) => {
    try {
      await onUpdateBidStatus(id, 'rejected');
      setBids((prevBids) => prevBids.filter((bid) => bid.id !== id));
    } catch (error) {
      setError("Failed to update bid status");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="px-4 py-12">
        <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[375px] mx-auto lg:px-10 md:px-6 px-4 py-12 space-y-12">
          {bids.length === 0 ? (
            <div className="text-gray-500 text-center">No bids available</div>
          ) : (
            bids.map((bid) => (
              <div key={bid.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={bid.img_url}
                      alt="bid_image"
                      className="lg:block md:hidden block h-32 w-32 object-cover rounded-full shadow-md"
                    />
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-6 w-full text-center md:text-left">
                    <h2 className="lg:text-2xl md:text-xl text-xl font-semibold">
                      {bid.title}
                    </h2>
                    <table className="text-base text-gray-600 mt-4 w-full">
                      <tbody>
                        <tr>
                          <td className="font-semibold pr-4">Carrier Name:</td>
                          <td>{bid.f_name} {bid.l_name}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold pr-4">Address:</td>
                          <td>{bid.city}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold pr-4">Amount:</td>
                          <td>{bid.bid_amount}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center md:justify-start">
                      <button
                        className="bg-gray-300 text-gray-800 text-base font-medium w-full md:w-auto px-3 py-2 rounded hover:bg-gray-400 transition duration-300 ease-in-out"
                        onClick={() => handleReject(bid.id)}
                      >
                        Reject
                      </button>
                      <button
                        className="bg-blue-600 text-base font-medium w-full md:w-auto px-3 py-2 rounded text-white hover:bg-blue-500 transition duration-300 ease-in-out"
                        onClick={() => handleAccept(bid.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="text-gray-800 text-base font-medium w-full md:w-auto px-3 py-2 rounded underline hover:text-gray-700 transition duration-300 ease-in-out"
                      >
                        See More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShipperBids;
