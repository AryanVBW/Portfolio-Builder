import React from 'react';
import { UserData } from '../types/portfolio';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export function UserForm({ userData, setUserData }: UserFormProps) {
  const addProject = () => {
    setUserData({
      ...userData,
      projects: [
        ...userData.projects,
        { title: '', description: '', technologies: [] },
      ],
    });
  };

  const removeProject = (index: number) => {
    const newProjects = [...userData.projects];
    newProjects.splice(index, 1);
    setUserData({ ...userData, projects: newProjects });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
        Personal Information
      </h2>
      
      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm transition-colors"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700">Profession</label>
          <input
            type="text"
            value={userData.profession}
            onChange={(e) => setUserData({ ...userData, profession: e.target.value })}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm transition-colors"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm transition-colors"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
          <input
            type="text"
            value={userData.skills.join(', ')}
            onChange={(e) => setUserData({ ...userData, skills: e.target.value.split(',').map(s => s.trim()) })}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm transition-colors"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">Projects</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addProject}
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Add Project
            </motion.button>
          </div>

          <AnimatePresence>
            {userData.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-2 p-4 border rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-md font-medium text-gray-700">Project {index + 1}</h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </motion.button>
                </div>

                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...userData.projects];
                    newProjects[index] = { ...project, title: e.target.value };
                    setUserData({ ...userData, projects: newProjects });
                  }}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm transition-colors"
                />

                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...userData.projects];
                    newProjects[index] = { ...project, description: e.target.value };
                    setUserData({ ...userData, projects: newProjects });
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm transition-colors"
                />

                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={project.technologies.join(', ')}
                  onChange={(e) => {
                    const newProjects = [...userData.projects];
                    newProjects[index] = {
                      ...project,
                      technologies: e.target.value.split(',').map(t => t.trim()),
                    };
                    setUserData({ ...userData, projects: newProjects });
                  }}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm transition-colors"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}