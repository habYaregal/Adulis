import { useState, useEffect } from 'react';
import { onGetTrucks } from '../../../api/truck'; // Adjust the import path as needed

const TruckList = () => {
  const [trucks, setTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const { data } = await onGetTrucks();
        console.log("Fetched truck data:", data); // Debugging line
        setTrucks(Array.isArray(data) ? data : []);
      } catch (error) {
        setError("Failed to fetch trucks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  const filteredTrucks = trucks.filter(truck =>
    Object.values(truck).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Available Trucks</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-main-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrucks.map(truck => (
          <div key={truck.license_plate} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-40">
                <img className="w-full h-40 object-cover" src={truck.img_url} alt={truck.truck_type} />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{truck.truck_type}</h3>
                  <div className="flex flex-col space-y-2 mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Year: </span>{truck.m_year}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Capacity: </span>{truck.capacity}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">City: </span>{truck.city}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Owner: </span>{truck.f_name} {truck.l_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">License Plate: </span>{truck.licence_plate}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Info: </span>{truck.truck_info}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-main-500 text-white px-4 py-2 rounded-md hover:bg-main-600 focus:outline-none focus:ring-2 focus:ring-main-500 focus:ring-offset-2">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TruckList;
