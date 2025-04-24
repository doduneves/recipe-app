import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleGoBack}
      className=" hover:bg-orange-200 text-orange-400 border-orange-400 border font-semibold text-sm py-0.5 px-4 rounded focus:outline-none focus:shadow-outline my-4"
    >
      Back
    </button>
  );
};

export default BackButton;
