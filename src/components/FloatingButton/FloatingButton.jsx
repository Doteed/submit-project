import React from "react";

const FloatingButton = ({ icon, onClick, tooltip = "", type = "primary" }) => {
  const baseStyle =
    "fixed z-50 bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full shadow-xl text-xl transition duration-300";
  const colorStyle =
    type === "primary"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${colorStyle}`}
      title={tooltip}
      aria-label={tooltip}
    >
      {icon}
    </button>
  );
};

export default FloatingButton;
