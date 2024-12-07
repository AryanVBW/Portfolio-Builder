import React, { useRef } from 'react';
import { UserData } from '../types/portfolio';
import { PlusCircle, MinusCircle, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

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

  const [socialLinks, setSocialLinks] = React.useState({
    github: userData.github || '',
    linkedin: userData.linkedin || '',
    twitter: userData.twitter || '',
    instagram: userData.instagram || '',
  });

  const handleSubmit = () => {
    setUserData({
      ...userData,
      projects: userData.projects,
      github: socialLinks.github,
      linkedin: socialLinks.linkedin,
      twitter: socialLinks.twitter,
      instagram: socialLinks.instagram,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({
          ...userData,
          profileImage: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
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
        <div className="flex flex-col items-center space-y-4">
          {userData.profileImage ? (
            <div className="relative w-32 h-32">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100"
              >
                <Upload className="w-4 h-4" />
              </label>
            </div>
          ) : (
            <label
              htmlFor="profile-image"
              className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-gray-400"
            >
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <span className="text-sm text-gray-500">Upload Photo</span>
              </div>
            </label>
          )}
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

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

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-medium bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">Social Media Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LinkedIn */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Linkedin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="LinkedIn Profile URL"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* GitHub */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Github className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="GitHub Profile URL"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Twitter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Twitter className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="Twitter Profile URL"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Instagram */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Instagram className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="Instagram Profile URL"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}