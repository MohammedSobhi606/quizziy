import { FaSpinner } from "react-icons/fa6";

const Loading = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-100 opacity-50 flex items-center justify-center">
        <FaSpinner className="animate-spin w-12 h-12 text-green-600 " />
      </div>

      {/* Your component content */}
    </div>
  );
};

export default Loading;
