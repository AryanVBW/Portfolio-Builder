import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserData } from '../types/portfolio';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log('API Key loaded:', API_KEY ? 'Yes' : 'No');

const genAI = new GoogleGenerativeAI(API_KEY);

export type AIError = {
  type: 'rate_limit' | 'api_error' | 'parse_error';
  message: string;
};

export async function generatePortfolioContent(userData: UserData): Promise<{ data: any; error: AIError | null }> {
  try {
    console.log('Starting AI content generation...');
    console.log('User data received:', userData);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log('Model initialized');

    const prompt = `You are a professional portfolio content generator. Generate portfolio content based on the following information in valid JSON format.
    Use the exact structure provided below, maintaining all fields:

    User Information:
    Name: ${userData.name}
    Current Role: ${userData.profession}
    Experience: ${userData.experience} years
    Education: ${userData.education}
    Projects: ${JSON.stringify(userData.projects)}
    Skills: ${userData.skills.join(', ')}

    Please generate a JSON response with the following structure:
    {
      "profession": "enhanced professional title",
      "bio": "professional bio (2-3 sentences)",
      "skillCategories": {
        "technical": ["skill1", "skill2", ...],
        "soft": ["skill1", "skill2", ...],
        "tools": ["tool1", "tool2", ...]
      },
      "projects": [
        {
          "title": "project title",
          "description": "project description (1-2 sentences)",
          "technologies": ["tech1", "tech2", ...]
        }
      ],
      "socialLinks": {
        "linkedin": "suggested LinkedIn headline",
        "github": "suggested GitHub bio",
        "twitter": "suggested Twitter bio"
      }
    }

    Important: Ensure the response is in valid JSON format. Do not include any additional text or markdown, only the JSON object.`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('Received response from Gemini API');
    
    const response = await result.response;
    const text = response.text();
    console.log('Raw response text:', text);
    
    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedText = text.trim()
        .replace(/^```json/g, '')
        .replace(/```$/g, '')
        .replace(/^```/g, '')
        .trim();
      
      const parsedData = JSON.parse(cleanedText);
      console.log('Successfully parsed JSON response');
      
      // Validate the response structure
      if (!parsedData.profession || !parsedData.bio || !parsedData.skillCategories || !parsedData.projects || !parsedData.socialLinks) {
        throw new Error('Invalid response structure');
      }
      
      return { data: parsedData, error: null };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.log('Raw response:', text);
      return {
        data: null,
        error: {
          type: 'parse_error',
          message: 'Failed to parse AI response. The service returned an invalid format. Please try again.'
        }
      };
    }
  } catch (error: any) {
    console.error('Failed to generate AI content:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }

    if (error.message?.includes('rate limit exceeded')) {
      return {
        data: null,
        error: {
          type: 'rate_limit',
          message: 'Rate limit exceeded. Please try again in about an hour.'
        }
      };
    }

    return {
      data: null,
      error: {
        type: 'api_error',
        message: 'An error occurred while generating content. Please try again.'
      }
    };
  }
}
