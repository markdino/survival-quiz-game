import classNames from "classnames";

const LargeButton = ({ children, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-8 py-4 ml-2 text-2xl rounded-lg",
        disabled ? "bg-gray-200 text-gray-500" : "bg-yellow-400"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default LargeButton;
