import React from "react";
import { LoadingScreenIcon } from "../icons/icons";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <LoadingScreenIcon className="text-blue-600 text-6xl animate-spin mb-4" />
      <h2 className="text-2xl font-bold text-gray-700">Loading...</h2>
      <p className="text-gray-500">
        Please wait while we load the content for you.
      </p>
    </div>
  );
};

export default LoadingPage;
