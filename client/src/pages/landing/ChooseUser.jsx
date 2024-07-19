import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ChooseUser = () =>{
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();
  
    const handleOptionChange = (option) => {
      setSelectedOption(option);
    };
  
    const handleSubmit = () => {
      if (selectedOption === 'carrier') {
        navigate('/carrier_register');
      } else if (selectedOption === 'shipper') {
        navigate('/shipper_register');
      }
    };
  
    const getButtonText = () => {
      if (selectedOption === 'carrier') {
        return 'Join as Carrier';
      } else if (selectedOption === 'shipper') {
        return 'Join as Shipper';
      } else {
        return 'Create Account';
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-main-50 to-main-100">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Join as a Carrier or Shipper
        </h1>
        <div className="flex space-x-8 mb-8">
          <div 
            className={`p-8 border-2 rounded-xl shadow-lg cursor-pointer transition transform hover:scale-105 ${
              selectedOption === 'carrier' ? 'bg-main-50 border-main-600' : 'bg-white border-transparent'
            }`} 
            onClick={() => handleOptionChange('carrier')}
          >
            <div className="text-5xl mb-4">🚚</div>
            <div className="text-xl font-semibold text-gray-700">I'm a Carrier, looking for shipments</div>
          </div>
          <div 
            className={`p-8 border-2 rounded-xl shadow-lg cursor-pointer transition transform hover:scale-105 ${
              selectedOption === 'shipper' ? 'bg-main-50 border-main-600' : 'bg-white border-transparent'
            }`} 
            onClick={() => handleOptionChange('shipper')}
          >
            <div className="text-5xl mb-4">📦</div>
            <div className="text-xl font-semibold text-gray-700">I'm a Shipper, looking for carriers</div>
          </div>
        </div>
        <button 
          className={`px-8 py-3 text-lg font-semibold rounded-full shadow-md transition transform hover:scale-105 ${
            selectedOption ? 'bg-main-500 text-white hover:bg-main-900' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          {getButtonText()}
        </button>
        <div className="mt-6 text-gray-600">
          Already have an account? <a href="/login" className="text-main-600 hover:underline">Log In</a>
        </div>
      </div>
    );
}

export default ChooseUser;