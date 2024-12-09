# Portfolio Builder

A modern, interactive portfolio builder that helps you create stunning developer portfolios with ease. Built with React, TypeScript, and Framer Motion for smooth animations.

## 🌟 Features

- **Interactive Template Selection**: Choose from multiple professionally designed templates
- **Live Preview**: See your changes in real-time
- **Smooth Animations**: Enhanced user experience with Framer Motion animations
- **Responsive Design**: Looks great on all devices
- **Export Functionality**: Download your portfolio as a ready-to-deploy package
- **Logo Upload Feature**: Upload a custom logo for your portfolio

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Package Manager**: npm
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Form Handling**: Custom form components
- **File Generation**: Custom ZIP generation utility

## 🏗️ Project Structure

```
portfolio-builder/
├── src/
│   ├── components/         # React components
│   │   ├── UserForm.tsx   # Main form for user data
│   │   ├── PreviewButton.tsx # Template preview component
│   │   └── ...
│   ├── types/             # TypeScript type definitions
│   ├── lib/               # Utility functions
│   └── App.tsx           # Main application component
├── public/               # Static assets
└── ...config files      # Various configuration files
```

## 💫 Animation System

The project uses Framer Motion for smooth, professional animations:

1. **Template Selection Animation**
   - Hover effects with scale transformation
   - Selection highlight with a smooth border animation
   - Transition effects when switching between templates

2. **Interactive Elements**
   - Button hover and click animations
   - Form input focus animations
   - Smooth transitions between sections

## 🔄 How It Works

1. **User Input**
   - Users fill out their information in the UserForm component
   - Data is stored in React state using the UserData interface
   - Real-time validation ensures data quality

2. **Template Selection**
   - Users can browse and preview different templates
   - Each template has a unique animation on hover and selection
   - Preview updates in real-time as users make changes

3. **Portfolio Generation**
   - Selected template is populated with user data
   - Custom utility functions generate a downloadable ZIP
   - All assets and dependencies are bundled together

## 🔧 Text Replacement System

The text replacement system works through a combination of:
1. Template literals for dynamic content insertion
2. Regular expressions for pattern matching
3. Custom replacement functions for complex transformations

Example:
```typescript
const replaceTemplateContent = (template: string, userData: UserData) => {
  return template
    .replace(/{{name}}/g, userData.name)
    .replace(/{{profession}}/g, userData.profession)
    // ... more replacements
};
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AryanVBW/Portfolio-Builder.git
   cd Portfolio-Builder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📦 Generating Your Portfolio

To generate your portfolio:
1. Fill out the user information in the form.
2. Choose a template from the available options.
3. Click the **Download Portfolio** button.
4. A ZIP file will be created containing your portfolio files, including an HTML file, styles, and assets.
5. The ZIP file will automatically download to your device.

### Logo Upload Feature

You can now upload a logo for your portfolio! Simply click on the logo upload section in the Personal Information form, and select your logo image. The logo will be included in the generated portfolio.

## 🌟 How the Project Works

1. **User Input**: Users enter their personal and professional information in the UserForm component.
2. **Template Selection**: Users can select a template, which updates the live preview in real-time.
3. **Portfolio Generation**: Upon clicking the download button, the application generates a ZIP file containing the HTML, CSS, and any uploaded images, ready for deployment.

## 📝 Documentation

For more details on how to use the application and its features, please refer to the documentation within the codebase or the comments in the components.

## 💻 Contributing

We welcome contributions! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for more details.
