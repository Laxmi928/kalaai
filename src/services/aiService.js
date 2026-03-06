import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export const generateListing = async (base64Image, mimeType) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: mimeType,
            },
          },
          {
            text: "Analyze this image of a handmade craft and provide a product listing in JSON format with the following fields: title, description (detailed and soulful), tags (array), and materials (array).",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          materials: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["title", "description", "tags", "materials"],
      },
    },
  });

  return JSON.parse(response.text);
};

export const generateStory = async (artisanData) => {
  const ai = getAI();
  const prompt = `Generate a soulful and professional brand story for an artisan based on the following details:
  Artisan Name: ${artisanData.name}
  Craft Type: ${artisanData.craftType}
  Years of Experience: ${artisanData.experience}
  Cultural Background: ${artisanData.background}
  
  The story should highlight their heritage, dedication, and the uniqueness of their craft. Return the story as a string.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};

export const enhanceImage = async (base64Image, mimeType) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image.split(',')[1],
            mimeType: mimeType,
          },
        },
        {
          text: "Enhance this product image for a professional marketplace. Remove the background and place the product on a clean, soft-lit, minimalist studio background. Improve brightness, contrast, and sharpness.",
        },
      ],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
};

export const getTrendData = async () => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Suggest 5 trending handmade craft categories in India right now, with their current demand score (0-100) and growth percentage. Return as a JSON array of objects with fields: name, demand, growth.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            demand: { type: Type.NUMBER },
            growth: { type: Type.NUMBER },
          },
          required: ["name", "demand", "growth"],
        },
      },
    },
  });

  return JSON.parse(response.text);
};

export const extractDetailsFromSpeech = async (transcript) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract product details from the following speech transcript of an artisan: "${transcript}". 
    Provide the details in JSON format with fields: productType, origin, materials, and a short summary.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productType: { type: Type.STRING },
          origin: { type: Type.STRING },
          materials: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING },
        },
        required: ["productType", "origin", "materials", "summary"],
      },
    },
  });

  return JSON.parse(response.text);
};
