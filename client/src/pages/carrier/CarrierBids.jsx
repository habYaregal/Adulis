import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import CarrierNav from "../../components/CarrierNav";
import { onCarrierBidGet } from "../../api/bids"; // Adjust the import path as necessary
import Footer from "../../components/Footer";

const TableHeader = ({ columns }) => (
  <thead>
    <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8 bg-gray-50 dark:bg-main-700">
      {columns.map((col, index) => (
        <th
          key={index}
          className="text-gray-600 dark:text-gray-300 font-semibold pr-6 text-left text-sm tracking-normal leading-4 px-4 py-2"
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({ data }) => (
  <tr className="h-24 border-gray-300 dark:border-gray-200 border-b bg-white dark:bg-main-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
    {data.map((cell, index) => (
      <td key={index} className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 px-4 py-2">
        {cell}
      </td>
    ))}
  </tr>
);

const CarrierBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    "Title",
    "Origin",
    "Destination",
    "Amount",
    "Status"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await onCarrierBidGet();
        setBids(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching carrier bids:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <CarrierNav />
      <div>
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <TableHeader columns={columns} />
              <tbody>
                {bids.map((bid, index) => (
                  <TableRow
                    key={index}
                    data={[
                      bid.title,
                      bid.origin,
                      bid.destination,
                      bid.bid_amount,
                      bid.status
                    ]}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TableRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])).isRequired,
};

export default CarrierBids;
