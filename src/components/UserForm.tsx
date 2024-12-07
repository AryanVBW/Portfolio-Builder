import React from 'react';
import { UserData } from '../types/portfolio';
import { PlusCircle, MinusCircle } from 'lucide-react';

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
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profession</label>
          <input
            type="text"
            value={userData.profession}
            onChange={(e) => setUserData({ ...userData, profession: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
          <input
            type="text"
            value={userData.skills.join(', ')}
            onChange={(e) => setUserData({ ...userData, skills: e.target.value.split(',').map(s => s.trim()) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Projects</h3>
            <button
              onClick={addProject}
              className="flex items-center text-indigo-600 hover:text-indigo-700"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Add Project
            </button>
          </div>

          {userData.projects.map((project, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <h4 className="text-md font-medium">Project {index + 1}</h4>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}