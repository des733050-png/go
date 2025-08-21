# GONEP Frontend Website

A modern, responsive React website for the GONEP healthcare platform built with Vite, TypeScript, and Tailwind CSS.

<!-- DEPLOYMENT TRIGGER: Force gonepharm deployment with latest security fixes -->

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The application will be available at http://localhost:8001

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 4
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Charts**: Recharts

## 📁 Project Structure

```
src/
├── assets/           # Static assets (images, etc.)
├── components/       # React components
│   ├── atomic/       # Reusable atomic components
│   ├── figma/        # Design system components
│   ├── pages/        # Page components
│   ├── ui/           # shadcn/ui components
│   └── validation/   # Form validation components
├── services/         # API services
├── styles/           # Global styles
├── utils/            # Utility functions
├── App.tsx           # Main app component
├── main.tsx          # Application entry point
└── Router.tsx        # Routing configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Accent**: Green (#10B981)
- **Neutral**: Gray scale (#F9FAFB to #111827)

### Typography
- **Headings**: Inter font family
- **Body**: Inter font family
- **Code**: JetBrains Mono

### Components
The project uses shadcn/ui components for consistency:
- Buttons, Cards, Forms
- Modals, Dropdowns, Navigation
- Tables, Charts, Progress indicators

## 📱 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - Company information
- **Products** (`/products`) - Product showcase
- **Solutions** (`/solutions`) - Healthcare solutions
- **Team** (`/team`) - Team member profiles
- **Careers** (`/careers`) - Job openings
- **Blog** (`/blog`) - Blog articles
- **Contact** (`/contact`) - Contact form
- **Support** (`/support`) - Support information

### Interactive Features
- **Newsletter Subscription** - Email signup
- **Demo Request** - Product demo requests
- **Contact Forms** - Multiple contact points
- **Job Applications** - Career applications
- **Blog Comments** - Article discussions

## 🔧 Development

### Environment Setup

The frontend doesn't require a `.env` file for basic functionality, but you can create one for custom configurations:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=GONEP Healthcare
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run deploy       # Deploy to GitHub Pages
```

### Development Server

The development server runs on port 8001 by default (configured in `vite.config.ts`):

```bash
npm run dev
# Server: http://localhost:8001
```

## 🖼️ Image Management

### Image Import System
Images are imported directly from the `src/assets/` directory using the utility functions in `src/utils/imageUtils.ts`:

```typescript
import { getImage } from '../utils/imageUtils';

const deviceImage = getImage('clinicAtHandOpenCrossview');
```

### Available Images
- `clinicAtHandOpenCrossview` - Device cross-view
- `clinicAtHandOpenWithIllustration` - Device with illustration
- `clinicAtHandClosedFrontLandscape` - Closed device landscape
- `clinicAtHandClosedVerticalPortrait` - Closed device portrait
- `logoWithoutTaglineBgWhite` - Logo without tagline
- `fullLogoWithTaglineBgWhite` - Full logo with tagline

## 🔌 API Integration

### API Service Layer
The application uses a centralized API service layer in `src/services/api.ts`:

```typescript
import { videoAPI, teamAPI, blogAPI } from '../services/api';

// Example usage
const videos = await videoAPI.getVideos();
const teamMembers = await teamAPI.getTeamMembers();
const blogPosts = await blogAPI.getPosts();
```

### Available API Services
- `videoAPI` - Video content management
- `teamAPI` - Team member data
- `demoAPI` - Demo request handling
- `careersAPI` - Job listings
- `blogAPI` - Blog content
- `contactAPI` - Contact forms
- `newsletterAPI` - Newsletter subscriptions
- `analyticsAPI` - Analytics tracking

## 🎭 Animations

### Framer Motion
The application uses Framer Motion for smooth animations:

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Animation Variants
Common animation variants are defined in components:
- Fade in/out
- Slide up/down
- Scale in/out
- Stagger children animations

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
All components are designed with a mobile-first approach using Tailwind CSS responsive classes:

```typescript
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Responsive content */}
</div>
```

## 🧪 Testing

### Component Testing
Components can be tested using React Testing Library:

```bash
npm test
```

### E2E Testing
For end-to-end testing, consider using Playwright or Cypress.

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify Deployment
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### GitHub Pages Deployment
```bash
npm run deploy
```

## 🔧 Configuration

### Vite Configuration
The build is configured in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 8001,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
```

### Tailwind Configuration
Tailwind CSS is configured in `tailwind.config.js` with custom colors, fonts, and animations.

### TypeScript Configuration
TypeScript is configured in `tsconfig.json` with strict type checking and path aliases.

## 🎨 Styling Guidelines

### CSS Classes
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use semantic color names

### Component Styling
- Use CSS modules for component-specific styles
- Leverage Tailwind's `@apply` directive for complex styles
- Keep styles close to components

## 📊 Performance Optimization

### Code Splitting
- Route-based code splitting with React Router
- Component lazy loading for large components
- Dynamic imports for heavy libraries

### Image Optimization
- Images are optimized during build
- Lazy loading for images below the fold
- WebP format support for modern browsers

### Bundle Optimization
- Tree shaking for unused code
- Vendor chunk splitting
- Gzip compression

## 🔒 Security

### Content Security Policy
- Configured in Vite for production builds
- Restricts resource loading to trusted sources
- Prevents XSS attacks

### API Security
- CORS configuration for API requests
- Input validation on forms
- Secure token handling

## 🆘 Troubleshooting

### Common Issues

#### Images Not Loading
1. Check image imports in `src/utils/imageUtils.ts`
2. Verify image files exist in `src/assets/`
3. Ensure proper image format (JPEG, PNG, WebP)

#### API Connection Issues
1. Verify backend server is running on port 8000
2. Check API base URL in `src/services/api.ts`
3. Ensure CORS is configured on backend

#### Build Issues
1. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. Clear build cache: `npm run build -- --force`
3. Check TypeScript errors: `npx tsc --noEmit`

## 📞 Support

For development issues:
1. Check the browser console for errors
2. Review the API service layer
3. Verify environment variables
4. Check the backend server status

## 🔄 Recent Updates

- ✅ Fixed image import system for production builds
- ✅ Added comprehensive API service layer
- ✅ Implemented responsive design system
- ✅ Added animation system with Framer Motion
- ✅ Created reusable component library
- ✅ Optimized build configuration
