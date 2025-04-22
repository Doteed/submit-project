import React from "react";
import { FloatButton } from "antd";

const FloatingButton = ({ icon, onClick, tooltip, type }) => {
  return (
    <FloatButton
      icon={icon}
      tooltip={tooltip}
      onClick={onClick}
      type={type}
    />
  );
};

export default FloatingButton;
