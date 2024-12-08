import React, { useState } from 'react';
import { UserForm } from './components/UserForm';
import { TemplatePreview } from './components/TemplatePreview';
import { UserData, TemplateId } from './types/portfolio';
import { Download, Wand2, Sparkles } from 'lucide-react';
import { generatePortfolioContent } from './services/aiService';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

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
  profileImage: '',
  avatarFileName: '',
};

function App() {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('minimal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const templates: TemplateId[] = ['minimal', 'modern', 'creative'];

  const handleGeneratePortfolio = () => {
    // If there's a profile image, save it as avatar with original extension
    if (userData.profileImage && userData.avatarFileName) {
      // Convert base64 to blob
      const base64Data = userData.profileImage.split(',')[1];
      const imageBlob = base64ToBlob(base64Data, 'image/*');
      
      // Create a download link for the image
      const imageUrl = URL.createObjectURL(imageBlob);
      const imageLink = document.createElement('a');
      imageLink.href = imageUrl;
      imageLink.download = userData.avatarFileName;
      document.body.appendChild(imageLink);
      imageLink.click();
      document.body.removeChild(imageLink);
      URL.revokeObjectURL(imageUrl);
    }

    // Create HTML content based on selected template
    let content = '';
    switch (selectedTemplate) {
      case 'minimal':
        content = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>${userData.name} - Portfolio</title>
              <style>
                /* Add your minimal template styles here */
              </style>
            </head>
            <body>
              <!-- Reference the avatar image in the HTML -->
              ${userData.avatarFileName ? `<img src="${userData.avatarFileName}" alt="Profile" class="profile-image">` : ''}
              <!-- Rest of the template content -->
            </body>
          </html>
        `;
        break;
      case 'modern':
        content = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>${userData.name} - Portfolio</title>
              <style>
                /* Add your modern template styles here */
              </style>
            </head>
            <body>
              <!-- Reference the avatar image in the HTML -->
              ${userData.avatarFileName ? `<img src="${userData.avatarFileName}" alt="Profile" class="profile-image">` : ''}
              <!-- Rest of the template content -->
            </body>
          </html>
        `;
        break;
      case 'creative':
        content = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>${userData.name} - Portfolio</title>
              <style>
                /* Add your creative template styles here */
              </style>
            </head>
            <body>
              <!-- Reference the avatar image in the HTML -->
              ${userData.avatarFileName ? `<img src="${userData.avatarFileName}" alt="Profile" class="profile-image">` : ''}
              <!-- Rest of the template content -->
            </body>
          </html>
        `;
        break;
    }

    // Create a Blob with the HTML content
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${userData.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper function to convert base64 to blob
  const base64ToBlob = (base64: string, type: string): Blob => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type });
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      console.log('Starting AI generation with user data:', userData);
      const { data, error } = await generatePortfolioContent(userData);
      
      if (error) {
        setError(error.message);
        // If it's a rate limit error, show a more specific message
        if (error.type === 'rate_limit') {
          toast.error('Rate limit exceeded. Please try again in about an hour.', {
            duration: 5000,
          });
        } else {
          toast.error(error.message);
        }
      } else if (data) {
        const enhancedData = {
          ...userData,
          profession: data.profession || userData.profession,
          bio: data.bio,
          skills: [
            ...data.skillCategories.technical,
            ...data.skillCategories.soft,
            ...data.skillCategories.tools
          ],
          projects: data.projects.map(project => ({
            title: project.title,
            description: project.description,
            technologies: project.technologies
          })),
          socialLinks: data.socialLinks
        };
        setPreviewData(enhancedData);
        toast.success('Content generated successfully!');
      }
    } catch (error) {
      console.error('Error generating AI content:', error);
      setError('An error occurred while generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyAIContent = () => {
    if (previewData) {
      setUserData(previewData);
      setPreviewData(null);
    }
  };

  const handleCancelAIContent = () => {
    setPreviewData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <Toaster position="top-right" />
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto px-4 py-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
              Portfolio Builder
            </h1>
            <Sparkles className="w-6 h-6 text-secondary-500 animate-bounce-in" />
          </div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <UserForm userData={previewData || userData} setUserData={setUserData} />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
                    Choose a Template
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAIGenerate}
                    disabled={isGenerating}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white shadow-lg transition-colors ${
                      isGenerating 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600'
                    }`}
                  >
                    <Wand2 className="w-5 h-5" />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {previewData && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl shadow-md"
                    >
                      <p className="text-gray-700 mb-4">AI-generated content preview. Would you like to apply these changes?</p>
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleApplyAIContent}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors shadow-md"
                        >
                          Apply Changes
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCancelAIContent}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors shadow-md"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative">
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value as TemplateId)}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="minimal">Minimal Template</option>
                    <option value="modern">Modern Template</option>
                    <option value="creative">Creative Template</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <AnimatePresence>
                    {templates.map((templateId) => (
                      <motion.div
                        key={templateId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TemplatePreview
                          templateId={templateId}
                          userData={previewData || userData}
                          onSelect={() => setSelectedTemplate(templateId)}
                          selected={selectedTemplate === templateId}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGeneratePortfolio}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              Generate Portfolio
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;