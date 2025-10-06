
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
        AI Lifestyle Image Fusion
      </h1>
      <p className="text-lg text-gray-400">
        Combine your items into stunning, realistic scenes.
      </p>
    </header>
  );
};

export default Header;
