# 🎨 3D Components Documentation

## Overview

Premium 3D components built with React Three Fiber for the IITDeveloper website.

## Components

### HeroScene
Main 3D scene component with floating shapes, particles, and interactive elements.

```tsx
import { HeroScene } from '@/components/three';

<HeroScene />
```

### FloatingShape
Animated geometric shapes with distortion effects.

**Props:**
- `position: [number, number, number]` - 3D position
- `color?: string` - Hex color (default: '#00ff88')
- `speed?: number` - Animation speed (default: 1)
- `geometry?: 'box' | 'sphere' | 'torus' | 'octahedron'`

### ParticleField
Thousands of animated particles forming a galaxy-like effect.

**Props:**
- `count?: number` - Number of particles (default: 1000)

### WireframeShape
Wireframe geometric shapes with pulse effect.

**Props:**
- `position: [number, number, number]`
- `rotation?: [number, number, number]`
- `scale?: number`

## Performance

- Dynamic imports prevent SSR issues
- GPU-accelerated animations
- Optimized particle count
- Adaptive DPR (device pixel ratio)
- Suspense fallbacks

## Browser Support

Requires WebGL support (all modern browsers).
