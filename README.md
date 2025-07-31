# Pitch Writer - Next.js Version

A modern, highly animated AI-powered pitch generation website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 15** with App Router for optimal performance and SEO
- **Interactive AI Chat Interface** with real-time responses
- **Highly Animated UI** using Framer Motion
- **Dark/Light Mode** with next-themes
- **Responsive Design** with Tailwind CSS
- **Professional Pitch Output** with editing capabilities
- **TypeScript** for type safety
- **ShadCN UI Components** for polished interface

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations
- **ShadCN UI** - Beautiful, accessible components
- **next-themes** - Dark/light theme support

### State Management
- **TanStack React Query** - Server state management
- **React Context** - Local state management

## 📁 Project Structure

```
pitch-writer-nextjs/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Landing page
│   │   ├── chat/              # AI chat interface
│   │   └── pitch-output/      # Generated pitch display
│   ├── components/            # Reusable components
│   │   ├── ui/               # ShadCN UI components
│   │   ├── theme-provider.tsx
│   │   ├── navigation-header.tsx
│   │   └── animated-background.tsx
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utility functions
├── public/                   # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## 🎨 Key Features

### Landing Page
- Animated hero section with floating gradient orbs
- Feature showcase with hover effects
- Benefits section with staggered animations
- Call-to-action with gradient buttons

### Chat Interface
- Real-time AI conversation simulation
- Progress indicator for multi-step questionnaire
- Quick reply suggestions
- Typing indicators and smooth animations

### Pitch Output
- Professional markdown-style rendering
- Live editing capabilities
- Export options (download, copy, share)
- Statistics panel with word count and reading time

### Design System
- Consistent color scheme with CSS variables
- Dark/light mode support
- Custom animations and transitions
- Responsive breakpoints

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Extract the project files**
2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Pages Overview

### 1. Landing Page (`/`)
- Hero section with animated background
- Feature cards with hover effects
- Benefits showcase
- Call-to-action sections

### 2. Chat Page (`/chat`)
- Interactive AI assistant
- Multi-step questionnaire
- Progress tracking
- Quick reply options

### 3. Pitch Output (`/pitch-output`)
- Generated pitch display
- Edit/preview modes
- Export functionality
- Pitch statistics

## 🎨 Customization

### Colors
Edit `src/app/globals.css` to customize the color scheme:
```css
:root {
  --primary: hsl(262, 83%, 58%);
  --secondary: hsl(193, 95%, 68%);
  /* ... other variables */
}
```

### Animations
Modify animation settings in `tailwind.config.ts`:
```typescript
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  // ... other keyframes
}
```

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Tailwind CSS breakpoints
- Adaptive navigation
- Touch-friendly interactions

## 🌟 Performance Features

- **Next.js App Router** for optimized routing
- **Server Components** where appropriate
- **Dynamic imports** for code splitting
- **Optimized images** with Next.js Image component
- **CSS-in-JS** with Tailwind for minimal bundle size

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Configure build command as `npm run build`
- **Railway**: Supports Next.js out of the box
- **Render**: Use Node.js environment

## 📄 Environment Variables

Currently no environment variables are required for the frontend-only version. For future API integration:

```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Modern Next.js development patterns
- ✅ TypeScript best practices
- ✅ Advanced CSS animations
- ✅ Component composition with ShadCN UI
- ✅ State management with React Query
- ✅ Responsive design principles
- ✅ Performance optimization techniques

## 📋 Course Integration

Perfect capstone project showcasing:
- Modern React framework (Next.js)
- Type-safe development
- Advanced animations
- Professional UI/UX
- Production-ready code

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Future Enhancements

- API integration for real AI responses
- User authentication
- Database integration
- Pitch templates
- Collaboration features
- Export to PDF/PowerPoint

---

**Created with Next.js 15 + TypeScript + Tailwind CSS**

This version provides better performance, SEO optimization, and a more scalable architecture compared to the original Vite-based version.