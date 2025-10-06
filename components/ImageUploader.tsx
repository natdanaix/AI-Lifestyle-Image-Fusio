
import React, { useRef, useState, useCallback } from 'react';
import { BaseImage } from '../types';
import { UploadIcon, TrashIcon } from './icons';

interface ImageUploaderProps {
  baseImages: BaseImage[];
  onImagesChange: (images: BaseImage[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ baseImages, onImagesChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    const newImagesPromises: Promise<BaseImage>[] = imageFiles.map((file, index) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: `${file.name}-${Date.now()}-${index}`,
            file,
            dataUrl: e.target?.result as string,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagesPromises)
      .then(loadedImages => {
        onImagesChange([...baseImages, ...loadedImages]);
      })
      .catch(error => {
        console.error("Error reading files:", error);
      });
  }, [baseImages, onImagesChange]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(event.target.files);
  };

  const handleRemoveImage = (id: string) => {
    onImagesChange(baseImages.filter(image => image.id !== id));
  };
  
  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  };
  
  const dropzoneClasses = `w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 ${
    isDragging 
      ? 'border-purple-500 bg-gray-800/50 scale-105' 
      : 'border-gray-600 hover:border-purple-500 hover:bg-gray-800/50'
  }`;

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-200 mb-3">Base Images</h2>
      <div 
        onClick={handleAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={dropzoneClasses}
        role="button"
        tabIndex={0}
        aria-label="Image upload area"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
        <p className="mt-2 text-gray-400">
          <span className="font-semibold text-purple-400">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, WEBP, etc.</p>
      </div>
      {baseImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {baseImages.map(image => (
            <div key={image.id} className="relative group aspect-square">
              <img
                src={image.dataUrl}
                alt={image.file.name}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="p-2 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-300"
                  aria-label="Remove image"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
