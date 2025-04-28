
import React from "react";
import { motion } from "framer-motion";
import { useGmail } from "@/context/GmailContext";

const DensitySelector: React.FC = () => {
  const { state, dispatch } = useGmail();

  const setDensity = (density: "comfortable" | "cozy" | "compact") => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { density },
    });
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-md shadow-sm">
      <span className="text-sm font-medium">Display density:</span>
      
      <button
        className={`text-sm px-3 py-1 rounded ${
          state.settings.density === "comfortable"
            ? "bg-gmail-blue text-white"
            : "bg-gmail-lightGray text-gmail-gray"
        }`}
        onClick={() => setDensity("comfortable")}
      >
        Comfortable
      </button>
      
      <button
        className={`text-sm px-3 py-1 rounded ${
          state.settings.density === "cozy"
            ? "bg-gmail-blue text-white"
            : "bg-gmail-lightGray text-gmail-gray"
        }`}
        onClick={() => setDensity("cozy")}
      >
        Cozy
      </button>
      
      <button
        className={`text-sm px-3 py-1 rounded ${
          state.settings.density === "compact"
            ? "bg-gmail-blue text-white"
            : "bg-gmail-lightGray text-gmail-gray"
        }`}
        onClick={() => setDensity("compact")}
      >
        Compact
      </button>
    </div>
  );
};

export default DensitySelector;
