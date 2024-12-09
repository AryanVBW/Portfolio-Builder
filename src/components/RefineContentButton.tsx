import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateContent } from '../lib/gemini';
import { UserData } from '../types/portfolio';
import toast from 'react-hot-toast';

interface RefineContentButtonProps {
  userData: UserData;
  onUpdate: (newData: UserData) => void;
}

export function RefineContentButton({ userData, onUpdate }: RefineContentButtonProps) {
  const [isRefining, setIsRefining] = useState(false);

  const refineContent = async () => {
    setIsRefining(true);
    try {
      const refinedBio = await generateContent(
        `Enhance this professional bio, making it more engaging and professional: ${userData.bio}`
      );

      const refinedProjects = await Promise.all(
        userData.projects.map(async (project) => ({
          ...project,
          description: await generateContent(
            `Improve this project description, highlighting key achievements and technologies: ${project.description}`
          )
        }))
      );

      onUpdate({
        ...userData,
        bio: refinedBio,
        projects: refinedProjects,
      });

      toast.success('Content refined successfully!');
    } catch (error) {
      toast.error('Failed to refine content. Please try again.');
    } finally {
      setIsRefining(false);
    }
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