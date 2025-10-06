
import React from 'react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, isLoading }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-200 mb-3">Prompt</h2>
      <textarea
        value={prompt}
        onChange={e => onPromptChange(e.target.value)}
        disabled={isLoading}
        placeholder="e.g., Take all these items and put them together on a person, forming one complete realistic lifestyle image."
        className="w-full h-32 p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 disabled:opacity-50"
      />
    </div>
  );
};

export default PromptInput;
