import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernPortfolioTemplate from './ModernPortfolioTemplate';
import MinimalPortfolioTemplate from './MinimalPortfolioTemplate';
import '../styles/ModernPortfolioTemplate.css';
import '../styles/MinimalPortfolioTemplate.css';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  component: React.ComponentType<any>;
}

interface TemplateSelectorProps {
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    profileImage: string;
    location?: string;
    email?: string;
  };
  skills: Array<{
    category: string;
    items: Array<{ name: string; level: number }>;
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
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
  onTemplateSelect: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Portfolio',
    description: 'A bold and dynamic template with vibrant colors and smooth animations',
    preview: '/templates/modern-preview.jpg',
    component: ModernPortfolioTemplate,
  },
  {
    id: 'minimal',
    name: 'Minimal Portfolio',
    description: 'A clean and elegant template focusing on content and readability',
    preview: '/templates/minimal-preview.jpg',
    component: MinimalPortfolioTemplate,
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  personalInfo,
  skills,
  experience,
  projects,
  socialLinks,
  onTemplateSelect,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    onTemplateSelect(templateId);
  };

  const handlePreviewToggle = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const SelectedTemplateComponent = templates.find(
    (t) => t.id === selectedTemplate
  )?.component;

  return (
    <div className="template-selector">
      <AnimatePresence mode="wait">
        {isPreviewMode ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="template-preview-container"
          >
            {SelectedTemplateComponent && (
              <SelectedTemplateComponent
                personalInfo={personalInfo}
                skills={skills}
                experience={experience}
                projects={projects}
                socialLinks={socialLinks}
              />
            )}
            <button
              className="preview-toggle-button"
              onClick={handlePreviewToggle}
            >
              Back to Selection
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="template-grid"
          >
            {templates.map((template) => (
              <motion.div
                key={template.id}
                className={`template-card ${
                  selectedTemplate === template.id ? 'selected' : ''
                }`}
                whileHover={{ y: -5 }}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="template-preview">
                  <img src={template.preview} alt={template.name} />
                </div>
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                </div>
                <div className="template-actions">
                  <button
                    className="preview-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.id);
                      handlePreviewToggle();
                    }}
                  >
                    Preview
                  </button>
                  <button
                    className="select-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplateSelect(template.id);
                    }}
                  >
                    Select
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateSelector;
