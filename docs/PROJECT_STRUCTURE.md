# 🏗️ IITDeveloper - Project Structure

## 📁 Complete Folder Structure

```
iitdeveloper_website/
│
├── 📂 frontend/                          # Next.js Application
│   ├── public/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── videos/
│   │   │   └── models/                   # 3D models for Three.js
│   │   ├── fonts/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/                          # App Router (Next.js 14+)
│   │   │   ├── (marketing)/             # Route group - marketing pages
│   │   │   │   ├── page.tsx             # Landing page
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── services/
│   │   │   │   │   ├── page.tsx         # Services overview
│   │   │   │   │   ├── [slug]/          # Individual service pages
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── case-studies/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── blog/
│   │   │   │       ├── page.tsx
│   │   │   │       └── [slug]/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   ├── pricing-estimator/       # Core feature
│   │   │   │   ├── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── api/                     # Next.js API routes (proxy/server actions)
│   │   │   │   └── estimate/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── layout.tsx               # Root layout
│   │   │   ├── globals.css              # Global styles
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                      # Reusable UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── modal.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── layout/                  # Layout components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── MobileMenu.tsx
│   │   │   │
│   │   │   ├── sections/                # Page sections
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Services.tsx
│   │   │   │   ├── TechStack.tsx
│   │   │   │   ├── Testimonials.tsx
│   │   │   │   ├── CTA.tsx
│   │   │   │   ├── Stats.tsx
│   │   │   │   └── Process.tsx
│   │   │   │
│   │   │   ├── pricing/                 # Pricing estimator components
│   │   │   │   ├── PricingWizard.tsx
│   │   │   │   ├── ServiceSelector.tsx
│   │   │   │   ├── FeatureSelector.tsx
│   │   │   │   ├── TimelineSelector.tsx
│   │   │   │   ├── PriceBreakdown.tsx
│   │   │   │   ├── EstimateSummary.tsx
│   │   │   │   └── PDFGenerator.tsx
│   │   │   │
│   │   │   ├── three/                   # 3D components
│   │   │   │   ├── Scene.tsx
│   │   │   │   ├── FloatingElements.tsx
│   │   │   │   ├── ParticleField.tsx
│   │   │   │   └── GeometricShapes.tsx
│   │   │   │
│   │   │   ├── animations/              # Animation components
│   │   │   │   ├── FadeIn.tsx
│   │   │   │   ├── SlideUp.tsx
│   │   │   │   ├── ScrollReveal.tsx
│   │   │   │   ├── ParallaxSection.tsx
│   │   │   │   └── TextReveal.tsx
│   │   │   │
│   │   │   ├── effects/                 # Visual effects
│   │   │   │   ├── CursorGlow.tsx
│   │   │   │   ├── BackgroundGrid.tsx
│   │   │   │   ├── GlassCard.tsx
│   │   │   │   └── NeonBorder.tsx
│   │   │   │
│   │   │   └── chatbot/
│   │   │       ├── ChatWidget.tsx
│   │   │       ├── ChatMessage.tsx
│   │   │       └── ChatInput.tsx
│   │   │
│   │   ├── lib/                         # Utilities & configs
│   │   │   ├── api/                     # API client
│   │   │   │   ├── client.ts
│   │   │   │   ├── endpoints.ts
│   │   │   │   └── hooks.ts
│   │   │   ├── pricing/                 # Pricing calculation logic
│   │   │   │   ├── calculator.ts
│   │   │   │   ├── rules.ts
│   │   │   │   └── constants.ts
│   │   │   ├── animations/
│   │   │   │   ├── variants.ts
│   │   │   │   └── transitions.ts
│   │   │   ├── utils.ts
│   │   │   ├── cn.ts                    # Tailwind classname helper
│   │   │   └── validators.ts
│   │   │
│   │   ├── hooks/                       # Custom React hooks
│   │   │   ├── useScrollAnimation.ts
│   │   │   ├── useCursorEffect.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── usePricingEstimator.ts
│   │   │   └── useTheme.ts
│   │   │
│   │   ├── contexts/                    # React contexts
│   │   │   ├── ThemeContext.tsx
│   │   │   └── PricingContext.tsx
│   │   │
│   │   ├── store/                       # State management (Zustand)
│   │   │   ├── estimatorStore.ts
│   │   │   └── uiStore.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── animations.css
│   │   │   └── effects.css
│   │   │
│   │   └── types/
│   │       ├── pricing.ts
│   │       ├── services.ts
│   │       └── api.ts
│   │
│   ├── .env.local
│   ├── .env.example
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
├── 📂 backend/                           # Node.js API Server
│   ├── src/
│   │   ├── modules/
│   │   │   ├── pricing/
│   │   │   │   ├── pricing.controller.ts
│   │   │   │   ├── pricing.service.ts
│   │   │   │   ├── pricing.repository.ts
│   │   │   │   ├── pricing.validator.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-estimate.dto.ts
│   │   │   │       └── estimate-response.dto.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── services.controller.ts
│   │   │   │   ├── services.service.ts
│   │   │   │   └── services.repository.ts
│   │   │   │
│   │   │   ├── contact/
│   │   │   │   ├── contact.controller.ts
│   │   │   │   ├── contact.service.ts
│   │   │   │   └── contact.repository.ts
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── blog.controller.ts
│   │   │   │   ├── blog.service.ts
│   │   │   │   └── blog.repository.ts
│   │   │   │
│   │   │   └── analytics/
│   │   │       ├── analytics.controller.ts
│   │   │       └── analytics.service.ts
│   │   │
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── email.ts
│   │   │   ├── app.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   ├── cors.middleware.ts
│   │   │   ├── ratelimit.middleware.ts
│   │   │   └── logger.middleware.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   ├── pdf-generator.ts
│   │   │   ├── email-sender.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── types/
│   │   │   ├── express.d.ts
│   │   │   └── models.ts
│   │   │
│   │   ├── app.ts                       # Express app setup
│   │   └── server.ts                    # Server entry point
│   │
│   ├── tests/
│   │   ├── unit/
│   │   │   └── pricing.test.ts
│   │   ├── integration/
│   │   │   └── api.test.ts
│   │   └── setup.ts
│   │
│   ├── .env
│   ├── .env.example
│   ├── tsconfig.json
│   ├── package.json
│   ├── nodemon.json
│   └── README.md
│
├── 📂 database/                          # Database management
│   ├── migrations/
│   │   ├── 001_create_services.sql
│   │   ├── 002_create_pricing_rules.sql
│   │   ├── 003_create_estimates.sql
│   │   ├── 004_create_contacts.sql
│   │   ├── 005_create_blog_posts.sql
│   │   └── 006_create_analytics.sql
│   │
│   ├── seeds/
│   │   ├── services.sql
│   │   ├── pricing_rules.sql
│   │   └── sample_data.sql
│   │
│   ├── schemas/
│   │   ├── services.sql
│   │   ├── pricing.sql
│   │   └── analytics.sql
│   │
│   ├── scripts/
│   │   ├── init.sh
│   │   ├── migrate.sh
│   │   ├── seed.sh
│   │   └── backup.sh
│   │
│   └── README.md
│
├── 📂 infra/                            # Infrastructure & DevOps
│   ├── podman/
│   │   ├── frontend.Containerfile
│   │   ├── backend.Containerfile
│   │   ├── postgres.Containerfile
│   │   └── nginx.Containerfile
│   │
│   ├── compose/
│   │   ├── podman-compose.yml           # Main compose file
│   │   ├── podman-compose.dev.yml       # Development overrides
│   │   └── podman-compose.prod.yml      # Production overrides
│   │
│   ├── volumes/
│   │   ├── postgres/
│   │   │   └── .gitkeep
│   │   └── uploads/
│   │       └── .gitkeep
│   │
│   ├── nginx/
│   │   ├── nginx.conf
│   │   ├── ssl/
│   │   │   └── .gitkeep
│   │   └── conf.d/
│   │       ├── default.conf
│   │       └── ssl.conf
│   │
│   ├── scripts/
│   │   ├── start.sh
│   │   ├── stop.sh
│   │   ├── rebuild.sh
│   │   ├── logs.sh
│   │   └── deploy.sh
│   │
│   └── README.md
│
├── 📂 shared/                           # Shared code (types, constants)
│   ├── types/
│   │   ├── pricing.ts
│   │   ├── services.ts
│   │   ├── api.ts
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── services.ts
│   │   ├── pricing-rules.ts
│   │   ├── endpoints.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── index.ts
│   │
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
├── 📂 docs/                             # Documentation
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── database-schema.md
│   │   ├── api-design.md
│   │   └── frontend-structure.md
│   │
│   ├── deployment/
│   │   ├── local-setup.md
│   │   ├── production-deploy.md
│   │   └── podman-guide.md
│   │
│   ├── features/
│   │   ├── pricing-estimator.md
│   │   ├── animations.md
│   │   └── 3d-effects.md
│   │
│   └── api/
│       ├── endpoints.md
│       └── authentication.md
│
├── 📂 scripts/                          # Project-wide scripts
│   ├── setup.sh
│   ├── dev.sh
│   ├── build.sh
│   ├── test.sh
│   └── clean.sh
│
├── .gitignore
├── .prettierrc
├── .eslintrc.json
├── package.json                         # Root workspace package.json
├── turbo.json                           # Optional: Turborepo config
├── README.md
└── LICENSE
```

---

## 📊 Key Architecture Decisions

### Frontend (Next.js)
- **App Router** for modern routing with layouts
- **Route Groups** for better organization
- **Server Components** by default for performance
- **Client Components** for interactivity
- **API Routes** for backend proxying

### Backend (Node.js)
- **Modular architecture** for scalability
- **Repository pattern** for data access
- **DTO pattern** for validation
- **Middleware chain** for cross-cutting concerns

### Database (PostgreSQL)
- **Migration-based** schema management
- **Seed files** for initial data
- **Separate schemas** for different domains

### Infrastructure (Podman)
- **Multi-container** setup
- **Volume persistence** for data
- **Network isolation** for security
- **Environment-specific** configs

### Shared
- **Monorepo approach** for type safety
- **Shared types** between frontend/backend
- **Centralized constants** for consistency

---

## 🚀 Quick Start Commands

```bash
# Setup
./scripts/setup.sh

# Development
./scripts/dev.sh

# Build
./scripts/build.sh

# Deploy
./infra/scripts/deploy.sh
```

---

## 🎯 Next Steps

1. Initialize each module with package.json
2. Set up TypeScript configs
3. Create Podman containers
4. Implement core pricing logic
5. Build landing page UI
6. Add animations & 3D effects
7. Connect frontend to backend
8. Deploy & test

