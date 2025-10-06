
import React from 'react';
import { ExpandIcon, DownloadIcon } from './icons';

interface GeneratedImageProps {
  src: string;
  onExpand: () => void;
  onDownload: () => void;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ src, onExpand, onDownload }) => {
  return (
    <div className="relative group aspect-square overflow-hidden rounded-lg shadow-lg">
      <img
        src={src}
        alt="Generated lifestyle"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-4">
        <button
          onClick={onExpand}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-300 hover:bg-white/30"
          aria-label="Expand image"
        >
          <ExpandIcon className="h-6 w-6" />
        </button>
        <button
          onClick={onDownload}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-300 hover:bg-white/30"
          aria-label="Download image"
        >
          <DownloadIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default GeneratedImage;
