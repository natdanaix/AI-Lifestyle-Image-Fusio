
import { GoogleGenAI, Modality, Part } from "@google/genai";
import { BaseImage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const base64ToGenerativePart = (dataUrl: string): Part => {
  const [header, data] = dataUrl.split(',');
  const mimeType = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';
  return {
    inlineData: {
      mimeType,
      data,
    },
  };
};

export const generateLifestyleImages = async (
  baseImages: BaseImage[],
  prompt: string,
  count: number = 4
): Promise<string[]> => {
  if (baseImages.length === 0) {
    throw new Error("Please upload at least one base image.");
  }
  if (!prompt.trim()) {
    throw new Error("Please provide a prompt.");
  }

  const imageParts: Part[] = baseImages.map(img => base64ToGenerativePart(img.dataUrl));
  const textPart: Part = { text: prompt };

  const contents = {
    parts: [...imageParts, textPart],
  };

  const generateSingleImage = async (): Promise<string | null> => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: contents,
        config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Error generating a single image:", error);
      return null;
    }
  };

  const promises = Array.from({ length: count }, generateSingleImage);
  const results = await Promise.all(promises);
  
  const successfulResults = results.filter((result): result is string => result !== null);

  if (successfulResults.length === 0) {
      throw new Error("Failed to generate any images. The model may not have been able to process the request. Please try a different prompt or images.");
  }

  return successfulResults;
};
