# IITDeveloper Frontend

Premium, futuristic Next.js application with Tailwind CSS, Framer Motion animations, and Three.js 3D effects.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **UI Components**: Custom component library

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages
│   ├── pricing-estimator/ # Core pricing feature
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   ├── pricing/           # Pricing components
│   ├── three/             # 3D components
│   └── animations/        # Animation components
├── lib/                   # Utilities & configs
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript types
```

## 🎨 Design System

- **Dark Theme**: Default glassmorphism design
- **Colors**: Neon green (#00ff88), Purple (#a855f7), Cyan (#06b6d4)
- **Typography**: Inter (sans) + JetBrains Mono (mono)
- **Animations**: Custom Framer Motion variants
- **Effects**: Glass cards, neon borders, gradient text

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_CHATBOT=true
NEXT_PUBLIC_CONTACT_EMAIL=hello@iitdeveloper.com
```

## 📝 Development Guidelines

1. Use Server Components by default
2. Add 'use client' only when needed (animations, state, events)
3. Follow the component structure in `/components`
4. Use Tailwind utility classes with `cn()` helper
5. Implement animations with Framer Motion
6. Type everything with TypeScript

## 🎯 Core Features

- ✅ Responsive design (mobile-first)
- ✅ Dark mode with glassmorphism
- ✅ Smooth animations & transitions
- ✅ 3D effects (Three.js)
- ✅ Dynamic pricing estimator
- ✅ SEO optimized
- ✅ Performance optimized

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔗 Related

- Backend API: `../backend`
- Database: `../database`
- Infrastructure: `../infra`
