import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserData } from '../types/portfolio';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log('API Key loaded:', API_KEY ? 'Yes' : 'No');

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generatePortfolioContent(userData: UserData) {
  try {
    console.log('Starting AI content generation...');
    console.log('User data received:', userData);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log('Model initialized');

    const prompt = `Generate a professional portfolio content based on the following information:
    Name: ${userData.name}
    Profession: ${userData.profession}
    Bio: ${userData.bio}
    Skills: ${userData.skills.join(', ')}
    Projects: ${userData.projects.map(p => `
      - ${p.title}: ${p.description}
      Technologies: ${p.technologies.join(', ')}
    `).join('\n')}

    Please generate a complete portfolio profile with the following structure:
    1. Professional title (job role/profession)
    2. Bio (2-3 engaging paragraphs)
    3. Key skills (categorized by type)
    4. Projects (3-5 detailed projects)
    5. Social media suggestions
    6. Professional achievements

    Make it sound professional, modern, and engaging. Format the response as a JSON object with this structure:
    {
      "profession": "string",
      "bio": "string",
      "skillCategories": {
        "technical": ["skill1", "skill2"],
        "soft": ["skill1", "skill2"],
        "tools": ["tool1", "tool2"]
      },
      "projects": [{
        "title": "string",
        "description": "string",
        "technologies": ["tech1", "tech2"],
        "highlights": ["highlight1", "highlight2"]
      }],
      "achievements": ["achievement1", "achievement2"],
      "socialLinks": {
        "github": "string",
        "linkedin": "string",
        "twitter": "string",
        "website": "string"
      }
    }`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('Received response from Gemini API');
    
    const response = await result.response;
    const text = response.text();
    console.log('Response text:', text.substring(0, 100) + '...');
    
    try {
      const parsedData = JSON.parse(text);
      console.log('Successfully parsed JSON response');
      return parsedData;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.log('Raw response:', text);
      return null;
    }
  } catch (error) {
    console.error('Failed to generate AI content:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return null;
  }
}
