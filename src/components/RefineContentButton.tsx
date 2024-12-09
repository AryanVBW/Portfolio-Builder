import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserData } from '../types/portfolio';
import toast from 'react-hot-toast';

interface RefineContentButtonProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export function RefineContentButton({ userData, setUserData }: RefineContentButtonProps) {
  const [isRefining, setIsRefining] = useState(false);

  const refineContent = async () => {
    setIsRefining(true);
    try {
      // Example of AI-powered content refinement
      const refinedData = {
        ...userData,
        bio: userData.bio ? enhanceBio(userData.bio) : userData.bio,
        projects: userData.projects.map(project => ({
          ...project,
          description: project.description ? enhanceProjectDescription(project.description) : project.description
        }))
      };

      setUserData(refinedData);
      toast.success('Content refined successfully!');
    } catch (error) {
      console.error('Refinement error:', error);
      toast.error('Failed to refine content. Please try again.');
    } finally {
      setIsRefining(false);
    }
  };

  // Example enhancement functions (replace with actual AI implementation)
  const enhanceBio = (bio: string) => {
    return bio.length > 0 
      ? `${bio}\n\nAdditional professional achievements and expertise in the field.`
      : bio;
  };

  const enhanceProjectDescription = (description: string) => {
    return description.length > 0
      ? `${description}\n\nKey achievements: Improved performance by 50%, implemented best practices, and received positive user feedback.`
      : description;
  };

  return (
    <motion.button
      onClick={refineContent}
      disabled={isRefining}
      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Wand2 className="w-5 h-5" />
      <span>{isRefining ? 'Refining...' : 'Refine Content with AI'}</span>
    </motion.button>
  );
}