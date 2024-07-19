import shipper from "../../assets/images/shipper.jpg";
import carrier from "../../assets/images/carrier.jpg";
const posts = [
  {
    title: "Shipper",
    description:
      "Whether you’re a small business or a large enterprise, we have the software and solutions that you can tailor to your business to easily drive improvements.",
    imageUrl:shipper,
  },
  {
    title: "Carrier",
    description:
      "With upfront pricing, instant booking, 24/7 support, and facility ratings, Adulis puts you in the driver’s seat.",
    imageUrl:carrier,
  },
];

const Users = () => {
  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Join us today
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Make your shipping experience better
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
          {posts.map((post) => (
            <div
              key={post.title}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-80 w-full object-cover"
                  src={post.imageUrl}
                  alt=""
                />
              </div>
              <div className="flex-1 bg-main-500 pb-16 p-5 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-5xl my-8 font-semibold text-white">
                    {post.title}
                  </p>
                  <p className="mt-3 text-xl text-white">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Users;
