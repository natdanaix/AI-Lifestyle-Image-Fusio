
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import GeneratedImage from './components/GeneratedImage';
import ImageModal from './components/ImageModal';
import Spinner from './components/Spinner';
import Footer from './components/Footer';
import { BaseImage } from './types';
import { generateLifestyleImages } from './services/geminiService';

const App: React.FC = () => {
  const [baseImages, setBaseImages] = useState<BaseImage[]>([]);
  const [prompt, setPrompt] = useState<string>('Take all these items and put them together on the person, forming one complete realistic lifestyle image.');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (baseImages.length === 0 || !prompt) {
      setError('Please upload at least one image and provide a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateLifestyleImages(baseImages, prompt);
      setGeneratedImages(images);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [baseImages, prompt]);

  const handleDownload = (src: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `lifestyle-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleImagesChange = (images: BaseImage[]) => {
    setBaseImages(images);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Panel: Inputs */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex flex-col gap-8 shadow-2xl">
            <ImageUploader baseImages={baseImages} onImagesChange={handleImagesChange} />
            <PromptInput prompt={prompt} onPromptChange={setPrompt} isLoading={isLoading} />
            <button
              onClick={handleGenerateClick}
              disabled={isLoading || baseImages.length === 0}
              className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Generating...' : 'Generate Images'}
            </button>
          </div>

          {/* Right Panel: Outputs */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 min-h-[400px] flex flex-col shadow-2xl">
             <h2 className="text-xl font-semibold text-gray-200 mb-4">Final Images</h2>
             {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
             <div className="flex-grow flex items-center justify-center">
                {isLoading ? (
                    <Spinner />
                ) : generatedImages.length > 0 ? (
                    <div className="w-full grid grid-cols-2 gap-4">
                        {generatedImages.map((src, index) => (
                            <GeneratedImage
                                key={index}
                                src={src}
                                onExpand={() => setSelectedImage(src)}
                                onDownload={() => handleDownload(src)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <p>Your generated images will appear here.</p>
                    </div>
                )}
             </div>
          </div>
        </div>
        
        <Footer />
      </div>
      
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};

export default App;
