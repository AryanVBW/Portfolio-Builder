import React from 'react';
import { UserData } from '../types/portfolio';
import { MinimalTemplate } from '../components/templates/MinimalTemplate';
import { ModernTemplate } from '../components/templates/ModernTemplate';
import { CreativeTemplate } from '../components/templates/CreativeTemplate';
import { EnhancedTemplate } from '../components/templates/EnhancedTemplate';
import ReactDOMServer from 'react-dom/server';

interface TemplateFiles {
  [key: string]: string;
}

export async function generateTemplateFiles(
  userData: UserData,
  templateId: string
): Promise<TemplateFiles> {
  const templates = {
    minimal: MinimalTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
    enhanced: EnhancedTemplate,
  };

  const Template = templates[templateId as keyof typeof templates];
  
  if (!Template) {
    throw new Error(`Template ${templateId} not found`);
  }

  const htmlContent = ReactDOMServer.renderToString(
    React.createElement(Template, { userData })
  );

  const files: TemplateFiles = {
    'index.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userData.name} - Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://unpkg.com/framer-motion@4.1.17/dist/framer-motion.js"></script>
</head>
<body>
    <div id="root">${htmlContent}</div>
</body>
</html>`,
    'README.md': `
# ${userData.name}'s Portfolio

This portfolio website was generated using the Portfolio Builder application.

## Technologies Used
- React
- Tailwind CSS
- Framer Motion
- TypeScript

## Getting Started
1. Clone this repository
2. Run \`npm install\`
3. Run \`npm run dev\` to start the development server
`,
  };

  return files;
}