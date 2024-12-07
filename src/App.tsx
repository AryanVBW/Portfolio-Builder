import React, { useState } from 'react';
import { UserForm } from './components/UserForm';
import { TemplatePreview } from './components/TemplatePreview';
import { UserData, TemplateId } from './types/portfolio';
import { Download } from 'lucide-react';

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

function App() {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('minimal');

  const templates: TemplateId[] = ['minimal', 'modern', 'creative'];

  const handleGeneratePortfolio = () => {
    // Implementation for generating and downloading portfolio
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Builder</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <UserForm userData={userData} setUserData={setUserData} />
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
            <div className="grid grid-cols-1 gap-6">
              {templates.map((templateId) => (
                <TemplatePreview
                  key={templateId}
                  templateId={templateId}
                  userData={userData}
                  onSelect={() => setSelectedTemplate(templateId)}
                  selected={selectedTemplate === templateId}
                />
              ))}
            </div>

            <button
              onClick={handleGeneratePortfolio}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Generate Portfolio
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;