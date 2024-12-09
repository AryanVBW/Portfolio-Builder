import React, { useState } from 'react';
import { UserForm } from './components/UserForm';
import { TemplatePreview } from './components/TemplatePreview';
import { UserData, TemplateId } from './types/portfolio';
import { Download } from 'lucide-react';
import { generatePortfolioZip, downloadZip } from './lib/github';
import { Footer } from './components/Footer';
import { RefineContentButton } from './components/RefineContentButton';
import { PreviewButton } from './components/PreviewButton';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

const initialUserData: UserData = {
  name: '',
  profession: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
  skills: [],
  projects: [],
  education: [],
  experience: [],
  socialLinks: {},
};

export default function App() {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('future');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates: TemplateId[] = ['future', 'cyber', 'creative', 'modern', 'minimal'];

  const handleGeneratePortfolio = async () => {
    setIsGenerating(true);
    try {
      const zip = await generatePortfolioZip(userData, selectedTemplate);
      const fileName = `${userData.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.zip`;
      downloadZip(zip, fileName);
    } catch (error) {
      console.error('Error generating portfolio:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />
      
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 border-b border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Portfolio Builder
          </h1>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-6">
              <RefineContentButton userData={userData} onUpdate={setUserData} />
            </div>
            <UserForm userData={userData} setUserData={setUserData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Choose a Template
              </h2>
              <PreviewButton userData={userData} selectedTemplate={selectedTemplate} />
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {templates.map((template) => (
                <motion.div
                  key={template}
                  className={`relative p-4 rounded-lg cursor-pointer ${
                    selectedTemplate === template
                      ? 'bg-indigo-600 border-2 border-indigo-400'
                      : 'bg-gray-800 border-2 border-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTemplate(template)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                >
                  <motion.div
                    className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0"
                    animate={{
                      opacity: selectedTemplate === template ? 0.2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold capitalize mb-2">{template}</h3>
                    <PreviewButton template={template} userData={userData} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              onClick={handleGeneratePortfolio}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              {isGenerating ? 'Generating...' : 'Generate Portfolio'}
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}