import React from 'react';
import { UserData, TemplateId } from '../types/portfolio';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

interface TemplatePreviewProps {
  templateId: TemplateId;
  userData: UserData;
  onSelect: () => void;
  selected: boolean;
}

export function TemplatePreview({ templateId, userData, onSelect, selected }: TemplatePreviewProps) {
  const templates = {
    minimal: MinimalTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
  };

  const Template = templates[templateId];

  return (
    <div className={`relative border-2 rounded-lg overflow-hidden transition-all ${
      selected ? 'border-indigo-500 shadow-lg' : 'border-gray-200'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
        <button
          onClick={onSelect}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-gray-900 rounded-md shadow-lg hover:bg-gray-100 transition-colors"
        >
          {selected ? 'Selected Template' : 'Use This Template'}
        </button>
      </div>
      <div className="w-full aspect-[4/3] overflow-hidden">
        <div className="transform scale-[0.4] origin-top-left w-[250%] h-[250%]">
          <Template userData={userData} />
        </div>
      </div>
    </div>
  );
}