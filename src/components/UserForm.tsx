import React from 'react';
import { UserData } from '../types/portfolio';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { SocialLinks } from './SocialLinks';
import { ContentGenerator } from './ContentGenerator';

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
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg space-y-8 border border-gray-700">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">Personal Information</h2>
        <ImageUpload
          onImageUpload={(imageUrl) => setUserData({ ...userData, imageUrl })}
          currentImage={userData.imageUrl}
        />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Profession</label>
          <input
            type="text"
            value={userData.profession}
            onChange={(e) => setUserData({ ...userData, profession: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-400">Bio</label>
            <ContentGenerator
              type="bio"
              context={userData.profession}
              onGenerate={(content) => setUserData({ ...userData, bio: content })}
            />
          </div>
          <textarea
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Skills (comma-separated)</label>
          <input
            type="text"
            value={userData.skills.join(', ')}
            onChange={(e) => setUserData({ ...userData, skills: e.target.value.split(',').map(s => s.trim()) })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <SocialLinks
          socialLinks={userData.socialLinks}
          onUpdate={(links) => setUserData({ ...userData, socialLinks: links })}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Projects</h3>
            <button
              onClick={addProject}
              className="flex items-center text-indigo-600 hover:text-indigo-700"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Add Project
            </button>
          </div>

          {userData.projects.map((project, index) => (
            <div key={index} className="space-y-2 p-4 border border-gray-600 rounded-lg bg-gray-700">
              <div className="flex justify-between items-start">
                <h4 className="text-md font-medium text-white">Project {index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MinusCircle className="w-5 h-5" />
                </button>
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
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-400">Description</label>
                  <ContentGenerator
                    type="project"
                    context={project.title}
                    onGenerate={(content) => {
                      const newProjects = [...userData.projects];
                      newProjects[index] = { ...project, description: content };
                      setUserData({ ...userData, projects: newProjects });
                    }}
                  />
                </div>
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...userData.projects];
                    newProjects[index] = { ...project, description: e.target.value };
                    setUserData({ ...userData, projects: newProjects });
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

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
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}