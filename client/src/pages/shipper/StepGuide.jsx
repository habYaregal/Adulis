import { PencilAltIcon, TruckIcon, BadgeCheckIcon, ChatAltIcon, CheckIcon } from '@heroicons/react/solid';

const steps = [
  {
    icon: PencilAltIcon,
    title: "Step 1",
    description: "Create shipment details."
  },
  {
    icon: TruckIcon,
    title: "Step 2",
    description: "Select a carrier yourselves or wait for carriers to contact you."
  },
  {
    icon: BadgeCheckIcon,
    title: "Step 3",
    description: "Choose a carrier based on auction price."
  },
  {
    icon: ChatAltIcon,
    title: "Step 4",
    description: "Directly message with carriers about shipment details."
  },
  {
    icon: CheckIcon,
    title: "Step 5",
    description: "Confirm booking."
  }
];

const Step = ({ icon: Icon, title, description }) => (
  <div className="md:w-1/5 mb-4 md:mb-0">
    <div className="bg-gray-100 hover:bg-gray-200 transition-shadow shadow-lg rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <Icon className="h-12 w-12 text-[#064D72]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const StepGuide = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-8">How To Begin Your Journey With Us</h2>
      <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 px-2 mx-5">
        {steps.map((step, index) => (
          <Step key={index} {...step} />
        ))}
      </div>
    </div>
  );
};

export default StepGuide;
