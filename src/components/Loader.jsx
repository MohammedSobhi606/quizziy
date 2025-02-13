import { FaSpinner } from "react-icons/fa6";

const Loader = ({ color }) => {
  return (
    <FaSpinner
      className={`animate-spin w-12 h-12 ${
        color ? `text-${color}` : "text-green-600 "
      } `}
    />
  );
};

export default Loader;
