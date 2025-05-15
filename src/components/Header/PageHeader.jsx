import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black mr-4"
          aria-label="뒤로가기"
        >
          <ArrowLeftOutlined style={{ fontSize: "20px" }} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">{title}</h1>
      </div>
    </header>
  );
};

export default PageHeader;
