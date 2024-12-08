import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/TemplatePage.css';

const templates = [
  {
    id: 'modern',
    name: 'Modern Portfolio',
    description: 'A bold and dynamic template with vibrant colors',
    preview: 'https://github.com/AryanVBW/Portfolio-Builder/releases/download/v2/modern-template.jpg',
    color: '#3b82f6'
  },
  {
    id: 'minimal',
    name: 'Minimal Portfolio',
    description: 'Clean and elegant design focused on content',
    preview: 'https://github.com/AryanVBW/Portfolio-Builder/releases/download/v2/minimal-template.jpg',
    color: '#10b981'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Unique and artistic design for creatives',
    preview: 'https://github.com/AryanVBW/Portfolio-Builder/releases/download/v2/creative-template.jpg',
    color: '#8b5cf6'
  },
  {
    id: 'professional',
    name: 'Professional Portfolio',
    description: 'Corporate and professional appearance',
    preview: 'https://github.com/AryanVBW/Portfolio-Builder/releases/download/v2/professional-template.jpg',
    color: '#f43f5e'
  }
];

const TemplatePage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    navigate(`/personal-info?template=${templateId}`);
  };

  return (
    <div className="template-page">
      <motion.div
        className="template-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Choose Your Template</h1>
        <p>Select a template that best represents your style</p>
      </motion.div>

      <motion.div
        className="templates-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className="template-card"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="template-preview">
              <img src={template.preview} alt={template.name} />
              <div 
                className="template-overlay"
                style={{ backgroundColor: template.color + '22' }}
              />
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <motion.button
                className="select-template-btn"
                style={{ backgroundColor: template.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTemplateSelect(template.id)}
              >
                Select Template
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="template-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Can't decide? Preview each template with your information</p>
      </motion.div>
    </div>
  );
};

export default TemplatePage;
