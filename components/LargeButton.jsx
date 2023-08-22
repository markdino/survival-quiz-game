import classNames from "classnames";
import Ripple from "./Loading/Ripple";

const LargeButton = ({ children, disabled, onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-8 py-4 ml-2 text-2xl rounded-lg relative",
        disabled || loading
          ? "bg-gray-200 text-gray-500"
          : "bg-yellow-400 hover:-translate-y-1 drop-shadow-lg transition-transform"
      )}
      disabled={disabled || loading}
    >
      {children}
      {loading && (
        <Ripple className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center" />
      )}
    </button>
  );
};

export default LargeButton;
