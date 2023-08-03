import React from "react";
import classNames from "classnames";

const Alert = ({ text, variant, show }) => {
  const color = {
    success: "text-green-800 bg-green-100 border-green-200",
    warning: "text-yellow-700 bg-amber-50 border-amber-100",
    danger: "text-red-900 bg-red-100 border-red-200",
    info: "text-teal-900 bg-teal-50 border-teal-100",
    light: "text-gray-500 bg-gray-50 border-gray-100",
    dark: "text-gray-800 bg-gray-300 border-gray-400",
  };
  return (
    <div
      id="alert"
      className={classNames(
        "font-normal text-left px-3 py-1 rounded-lg border mt-1",
        { hidden: !show },
        color[variant] || color.light
      )}
    >
      {text}
    </div>
  );
};

export default Alert;
