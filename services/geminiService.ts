
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, AnalysisResult, Recommendation } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    isMismatch: { type: Type.BOOLEAN },
    mismatchDetails: { type: Type.STRING },
    floweringPeak: { type: Type.STRING },
    pollinatorPeak: { type: Type.STRING },
    severity: {
      type: Type.STRING,
      enum: ['low', 'medium', 'high', 'none'],
    },
  },
  required: ['isMismatch', 'mismatchDetails', 'floweringPeak', 'pollinatorPeak', 'severity'],
};

const recommendationsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { 
                type: Type.STRING,
                enum: ['Farming', 'Conservation', 'Community']
            },
        },
        required: ['title', 'description', 'category'],
    }
};

export const analyzeSynchrony = async (formData: FormData): Promise<AnalysisResult> => {
  const { flower, season, location, pollinator } = formData;
  const prompt = `
    Act as an expert ecologist specializing in phenology. Analyze the potential for a flowering-pollinator mismatch given the following data.
    - Flower: ${flower}
    - Season: ${season}
    - Location: ${location}
    - Pollinator: ${pollinator}

    Based on general ecological knowledge, determine if there is a likely mismatch. Climate change is causing earlier blooms. Consider this a primary factor.
    - isMismatch: true if a mismatch is likely, otherwise false.
    - mismatchDetails: A brief, one-sentence explanation of the potential mismatch. If no mismatch, state that synchrony appears stable.
    - floweringPeak: Estimated peak flowering period (e.g., 'Early April').
    - pollinatorPeak: Estimated peak pollinator activity period (e.g., 'Late April').
    - severity: 'high', 'medium', 'low', or 'none'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResult;
  } catch (error) {
    console.error("Error calling Gemini API for analysis:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};

export const generateRecommendations = async (mismatchDetails: string): Promise<Recommendation[]> => {
    const prompt = `
        Based on the ecological mismatch described as "${mismatchDetails}", provide 3 practical, actionable recommendations.
        Categorize each recommendation as 'Farming', 'Conservation', or 'Community'.
        Return the recommendations in a JSON array.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: recommendationsSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as Recommendation[];
    } catch (error) {
        console.error("Error calling Gemini API for recommendations:", error);
        throw new Error("Failed to get recommendations from Gemini API.");
    }
};

export const generateStory = async (mismatchDetails: string): Promise<string> => {
    const prompt = `
        Create a short, engaging, and slightly emotional story (2-3 paragraphs) for a general audience about the ecological impact of this specific mismatch: "${mismatchDetails}".
        The story should highlight the interconnectedness of nature and the consequences of the timing being off. For example: "In the quiet valleys of [Location], the [Flower] unfurled its petals, a vibrant promise of spring. But it was a promise made too soon..."
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for story:", error);
        throw new Error("Failed to get story from Gemini API.");
    }
};
