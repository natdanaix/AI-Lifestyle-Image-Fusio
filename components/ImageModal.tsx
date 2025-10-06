
import React, { useEffect } from 'react';
import { CloseIcon } from './icons';

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-full"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking on the image
      >
        <img src={src} alt="Expanded view" className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-200 transition-all duration-200"
          aria-label="Close"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ImageModal;
