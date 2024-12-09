import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { UserData, TemplateId } from '../types/portfolio';
import { CyberTemplate } from './templates/CyberTemplate';
import { FutureTemplate } from './templates/FutureTemplate';

interface LivePreviewProps {
  userData: UserData;
  selectedTemplate: TemplateId;
  onTemplateChange: (template: TemplateId) => void;
  templates: TemplateId[];
}

export function LivePreview({ 
  userData, 
  selectedTemplate, 
  onTemplateChange,
  templates 
}: LivePreviewProps) {
  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case 'cyber':
        return <CyberTemplate userData={userData} />;
      case 'future':
        return <FutureTemplate userData={userData} />;
      default:
        return <FutureTemplate userData={userData} />;
    }
  };

  const currentIndex = templates.indexOf(selectedTemplate);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? templates.length - 1 : currentIndex - 1;
    onTemplateChange(templates[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === templates.length - 1 ? 0 : currentIndex + 1;
    onTemplateChange(templates[newIndex]);
  };

  return (
    <div className="relative h-full w-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Preview Header */}
      <div className="absolute top-0 left-0 right-0 bg-gray-800 p-4 z-10 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white capitalize">
          {selectedTemplate} Template
        </h3>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Template Preview */}
      <div className="mt-16 h-[calc(100%-4rem)] overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTemplate}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {getTemplateComponent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Template Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {templates.map((template, index) => (
          <motion.button
            key={template}
            onClick={() => onTemplateChange(template)}
            className={`w-2 h-2 rounded-full ${
              selectedTemplate === template ? 'bg-indigo-500' : 'bg-gray-600'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}
