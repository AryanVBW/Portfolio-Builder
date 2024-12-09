# Portfolio Builder - Project Structure Documentation

## 📁 Directory Structure

```
portfolio-builder/
├── src/
│   ├── components/           # React components
│   │   ├── templates/       # Portfolio templates
│   │   ├── UserForm.tsx    # Main form component
│   │   ├── ImageUpload.tsx # Image upload handling
│   │   └── ...
│   ├── lib/                # Utility functions
│   │   ├── github.ts      # ZIP generation
│   │   └── templateGenerator.ts # HTML generation
│   ├── types/              # TypeScript definitions
│   └── App.tsx            # Main application
├── public/                # Static assets
└── docs/                 # Documentation
```

## 🔄 Application Flow

1. **User Input Flow**
   ```
   UserForm → State Management → Live Preview
      ↓
   Image Upload → Base64 Conversion → Preview
      ↓
   Template Selection → Preview Update
   ```

2. **Download Process**
   ```
   Download Button → Template Generator → ZIP Creation → Download
   ```

## 🧩 Key Components

### 1. UserForm (UserForm.tsx)
- Handles all user input
- Manages form state
- Validates input data
- Supports image uploads

### 2. Template Components
- Located in `src/components/templates/`
- Each template is a separate component
- Implements responsive design
- Supports dark mode

### 3. ImageUpload (ImageUpload.tsx)
- Handles image upload
- Converts images to base64
- Supports drag and drop
- Validates file types

### 4. TemplatePreview (TemplatePreview.tsx)
- Shows live preview
- Handles template switching
- Manages preview scaling
- Updates in real-time

## 🛠️ Utility Functions

### 1. Template Generator (templateGenerator.ts)
```typescript
export async function generateTemplateFiles(
  userData: UserData,
  templateId: string
): Promise<TemplateFiles>
```
- Converts React components to static HTML
- Handles image processing
- Generates CSS styles
- Creates responsive layouts

### 2. ZIP Generation (github.ts)
```typescript
export async function generatePortfolioZip(
  userData: UserData,
  templateId: string
): Promise<Blob>
```
- Creates ZIP structure
- Handles file organization
- Processes assets
- Manages compression

## 🎨 Templates

Each template follows this structure:
```typescript
interface Template {
  readonly id: string;
  readonly name: string;
  readonly component: React.FC<TemplateProps>;
  readonly preview: React.FC<PreviewProps>;
}
```

## 📦 Generated Portfolio Structure

```
user-portfolio/
├── index.html          # Main HTML file
├── styles.css         # Custom styles
├── assets/           # Images and resources
│   ├── profile.*    # Profile picture
│   └── logo.*      # Logo
└── README.md       # Usage instructions
```

## 🔄 State Management

The application uses React's Context API for state management:
```typescript
interface PortfolioContext {
  userData: UserData;
  setUserData: (data: UserData) => void;
  selectedTemplate: TemplateId;
  setSelectedTemplate: (id: TemplateId) => void;
}
```

## 🎯 Type Definitions

### UserData Interface
```typescript
interface UserData {
  name: string;
  profession: string;
  bio: string;
  skills: string[];
  projects: Project[];
  education: string[];
  experience: string[];
  socialLinks: SocialLinks;
  imageUrl?: string;
  logoUrl?: string;
}
```

## 🔒 Security Considerations

1. **Image Handling**
   - Images are converted to base64
   - Size limits are enforced
   - Only allowed formats accepted

2. **Data Processing**
   - All processing is client-side
   - No data persistence
   - No external API calls

## 🚀 Performance Optimizations

1. **Code Splitting**
   - Templates are lazy loaded
   - CSS is modular
   - Assets are optimized

2. **Image Optimization**
   - Compression before base64
   - Responsive images
   - Lazy loading

## 📱 Responsive Design Implementation

```css
/* Breakpoint structure */
sm: '640px',   // Mobile
md: '768px',   // Tablet
lg: '1024px',  // Laptop
xl: '1280px',  // Desktop
2xl: '1536px'  // Large Desktop
```

## 🌙 Dark Mode Implementation

```typescript
// Dark mode detection
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}
```

## 🔄 Build Process

1. Development
   ```bash
   npm run dev
   ```

2. Production Build
   ```bash
   npm run build
   ```

3. Preview Production Build
   ```bash
   npm run preview
   ```
