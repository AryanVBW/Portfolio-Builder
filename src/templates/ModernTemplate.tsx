import React from 'react';
import ModernPortfolioTemplate from '../components/ModernPortfolioTemplate';
import '../styles/ModernPortfolioTemplate.css';

interface ModernTemplateProps {
  profileData: {
    name: string;
    title: string;
    bio: string;
    profileImage: string;
    skills: Array<{ name: string; level: number }>;
    projects: Array<{
      title: string;
      description: string;
      technologies: string[];
      imageUrl?: string;
      link?: string;
    }>;
    socialLinks: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      email?: string;
    };
  };
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ profileData }) => {
  return <ModernPortfolioTemplate {...profileData} />;
};

// Example usage with sample data
const SampleModernTemplate: React.FC = () => {
  const sampleData = {
    name: "Vivek W",
    title: "Full Stack Developer",
    bio: "Passionate developer with expertise in building modern web applications. I love creating elegant solutions to complex problems and sharing knowledge with the developer community.",
    profileImage: "path/to/uploaded/image.jpg", // This will be replaced with the actual uploaded image
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Python", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Docker", level: 65 },
    ],
    projects: [
      {
        title: "Portfolio Builder",
        description: "A modern portfolio builder with AI-powered template generation and GitHub integration.",
        technologies: ["React", "TypeScript", "Node.js", "AI"],
        imageUrl: "path/to/project/image.jpg",
        link: "https://github.com/AryanVBW/Portfolio-Builder"
      },
      {
        title: "Project 2",
        description: "Another amazing project showcasing your skills and expertise.",
        technologies: ["React", "Node.js", "MongoDB"],
        imageUrl: "path/to/project2/image.jpg",
        link: "https://github.com/yourusername/project2"
      },
    ],
    socialLinks: {
      github: "https://github.com/AryanVBW",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
      email: "vivek.aryanvbw@gmail.com"
    }
  };

  return <ModernTemplate profileData={sampleData} />;
};

export default ModernTemplate;
export { SampleModernTemplate };
