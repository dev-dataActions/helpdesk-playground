import { FcHome } from "react-icons/fc";

const AnalyticsPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="p-16 rounded-lg bg-white w-[50%] h-[40%] text-center shadow-sm -mt-16">
        <p className="text-3xl h-full font-medium flex gap-4 items-center justify-center text-gray-600">
          <FcHome size={36} />
          Get started...
        </p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
