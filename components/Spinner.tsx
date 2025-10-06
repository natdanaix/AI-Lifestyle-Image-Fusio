
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-t-purple-500 border-gray-600 rounded-full animate-spin"></div>
      <p className="text-gray-400">Generating your masterpiece...</p>
    </div>
  );
};

export default Spinner;
