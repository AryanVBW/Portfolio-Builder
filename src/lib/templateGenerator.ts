import React from 'react';
import { UserData } from '../types/portfolio';
import { MinimalTemplate } from '../components/templates/MinimalTemplate';
import { ModernTemplate } from '../components/templates/ModernTemplate';
import { CreativeTemplate } from '../components/templates/CreativeTemplate';
import { EnhancedTemplate } from '../components/templates/EnhancedTemplate';
import { CyberTemplate } from '../components/templates/CyberTemplate';
import { FutureTemplate } from '../components/templates/FutureTemplate';
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
    cyber: CyberTemplate,
    future: FutureTemplate,
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
    <link href="styles.css" rel="stylesheet">
    <script src="https://unpkg.com/framer-motion@4.1.17/dist/framer-motion.js"></script>
</head>
<body>
    <div id="root">${htmlContent}</div>
</body>
</html>`,
    'styles.css': `
/* Custom styles for the portfolio */
:root {
  --primary-color: #6366f1;
  --secondary-color: #4f46e5;
  --text-color: #1f2937;
  --bg-color: #ffffff;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Add animations */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`,
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