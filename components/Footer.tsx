
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-8 mt-12 border-t border-gray-800">
      <p className="text-gray-400 mb-4">เว็บนี้สร้างโดย ซัน ธนวิชญ์ สามารถติดตามได้ที่นี่</p>
      <a
        href="https://www.facebook.com/SunTNW"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 font-semibold text-white bg-gradient-to-r from-teal-400 to-blue-500 rounded-full shadow-lg hover:scale-105 hover:shadow-cyan-500/50 transform transition-all duration-300"
      >
        Follow Me on Facebook
      </a>
    </footer>
  );
};

export default Footer;
