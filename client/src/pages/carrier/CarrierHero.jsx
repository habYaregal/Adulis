import React from "react";
import celebrate from '../../assets/images/Celebrate.jpg'


const CarrierHero = () => {
  return (
    <div className="lg:px-6 xl:px-10">
      <div className="container mx-auto relative z-20">
        <div className="mx-auto container relative z-0 px-4 xl:px-0">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="md:w-3/5 md:pt-24 pb-10 lg:py-32 xl:py-48">
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-black text-gray-900 text-center md:text-left tracking-tighter f-f-i leading-tight text-heading-color">
                ARE YOU READY TO CHANGE?
              </h1>
              <h2 className="md:w-8/12 py-4 text-center md:text-left md:py-8 text-gray-700 text-lg lg:text-xl">
                when you start to work with with us your business starts to grow exponentially
              </h2>
              <div className="w-full flex justify-center md:block">
                <button className="hover:opacity-90 bg-main-700 py-3 px-10 lg:py-5 lg:px-14 rounded-full text-white text-sm md:text-lg f-f-p">
                  Get Started
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/5 h-64 md:h-auto m-auto flex items-center overflow-hidden">
              <img
                className="md:absolute md:w-1/2 md:-ml-28"
                src={celebrate}
                alt="Device"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierHero;
