import truck1 from "../../assets/images/Truck1.jpg";
import truck2 from "../../assets/images/Truck22.jpg";
import truck3 from "../../assets/images/Truck3.jpg";
import truck4 from "../../assets/images/Truck4.jpg";
import truck5 from "../../assets/images/Truck5.jpg";
import truck6 from "../../assets/images/Truck6.jpg";

const carriers = [
    {
      name: 'Abebe Kebede',
      car_type: 'Big Truck',
      imageUrl: truck1
    },
    {
        name: 'Getahun Mekuriya',
        car_type: 'Pick Up',
        imageUrl: truck2
      },
      {
        name: 'Fanuel Almaw',
        car_type: 'Tanker Truck',
        imageUrl: truck3
      },
      {
        name: 'Kidist Mamaye',
        car_type: 'Mini Van',
        imageUrl: truck4
      },
      {
        name: 'Belay Sirak',
        car_type: 'Sino Truck',
        imageUrl: truck5
      },
      {
        name: 'Liyu Alemayehu',
        car_type: 'Pick Up',
        imageUrl: truck6
      },
              
  ]
const StarredShipper = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Top Rated Carriers
            </h2>
            <p className="text-xl text-gray-500">
              Our Top Rated carriers for the last month
            </p>
          </div>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {carriers.map((person) => (
              <li key={person.name}>
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      className="object-cover shadow-lg rounded-lg"
                      src={person.imageUrl}
                      alt=""
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>{person.name}</h3>
                      <p className="text-main-600">{person.car_type}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default StarredShipper;
