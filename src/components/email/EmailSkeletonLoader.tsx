
import React from "react";

const EmailSkeletonLoader: React.FC = () => {
  return (
    <div className="gmail-email-row animate-pulse">
      <div className="flex items-center p-2">
        <div className="flex items-center w-10 flex-shrink-0">
          <div className="h-4 w-4 rounded-sm gmail-skeleton" />
        </div>
        
        <div className="flex items-center w-8 flex-shrink-0">
          <div className="h-5 w-5 rounded-full gmail-skeleton" />
        </div>
        
        <div className="flex-grow flex">
          <div className="w-48 flex-shrink-0">
            <div className="h-4 w-32 gmail-skeleton rounded-md" />
          </div>
          
          <div className="flex-grow pr-2">
            <div className="h-4 w-full gmail-skeleton rounded-md" />
          </div>
          
          <div className="w-24 flex-shrink-0 text-right">
            <div className="h-4 w-16 ml-auto gmail-skeleton rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSkeletonLoader;
