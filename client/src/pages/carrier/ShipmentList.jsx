import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { onShipmentGet } from "../../api/shipment";
import SubmitBid from "./SubmitBid"; // Adjust the path as necessary

const PRODUCTS_PER_PAGE = 4;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShipmentList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitBidOpen, setIsSubmitBidOpen] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);

  // Reverse the products list and calculate total pages
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Slice the reversed products list for the current page
  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmitBidOpen = (shipmentId) => {
    setSelectedShipmentId(shipmentId);
    setIsSubmitBidOpen(true);
  };

  const handleSubmitBidClose = () => {
    setIsSubmitBidOpen(false);
    setSelectedShipmentId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await onShipmentGet();
        // Reverse the array before setting it to state
        setProducts(data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="space-y-10">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex flex-col lg:flex-row lg:gap-x-8 lg:items-start">
                {/* Image gallery */}
                <Tab.Group as="div" className="lg:w-1/3">
                  <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                    <img
                      src={product.img_url}
                      alt={product.title}
                      className="w-full h-48 object-center object-cover sm:rounded-lg"
                    />
                  </Tab.Panels>
                </Tab.Group>

                {/* Product info */}
                <div className="mt-6 lg:mt-0 lg:w-2/3">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    {product.title}
                  </h1>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Origin: {product.origin}
                    </p>
                    <p className="text-sm text-gray-500">
                      Destination: {product.destination}
                    </p>
                    <p className="text-sm text-gray-500">Weight: {product.weight}</p>
                  </div>

                  <div className="mt-4">
                    <div
                      className="text-base text-gray-700 space-y-4"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => handleSubmitBidOpen(product.id)}
                      className="w-full bg-main-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-main-400"
                    >
                      Place a bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePrevPage}
            className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l transition-colors duration-200"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r transition-colors duration-200"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <SubmitBid
        isOpen={isSubmitBidOpen}
        onClose={handleSubmitBidClose}
        shipmentId={selectedShipmentId}
      />
    </div>
  );
}
