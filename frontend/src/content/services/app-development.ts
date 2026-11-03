import type { ServiceContent } from '../schema';

export const appDevelopmentContent: ServiceContent = {
  slug: 'app-development',
  title: 'Mobile App Development — IITDeveloper',
  shortTitle: 'Mobile App Development',
  metaTitle: 'Mobile App Development Services | iOS & Android Apps | IITDeveloper',
  description: 'Professional mobile app development for iOS and Android. Native and cross-platform apps that users love. React Native, Flutter, Swift, and Kotlin expertise.',
  metaDescription: 'Professional mobile app development for iOS and Android. Native and cross-platform apps that users love. React Native, Flutter, Swift, and Kotlin expertise.',
  category: 'Build',
  badge: 'Mobile Apps',
  heroHeadline: 'Apps People Actually',
  heroHighlight: "Keep on Their Phones.",
  heroSubtitle: 'Native and cross-platform mobile apps built with React Native and Flutter. Beautiful, fast, and engineered to scale to millions.',
  features: [
    {
      iconName: 'Smartphone',
      title: 'Cross-Platform Development',
      description: 'React Native or Flutter. Write once, deploy everywhere. 60% cost savings.',
    },
    {
      iconName: 'Apple',
      title: 'Native iOS Apps',
      description: 'Swift and SwiftUI expertise. Full access to iOS features and APIs.',
    },
    {
      iconName: 'Play',
      title: 'Native Android Apps',
      description: 'Kotlin and Jetpack Compose. Material Design 3 implementations.',
    },
    {
      iconName: 'Zap',
      title: 'High Performance',
      description: '60 FPS animations. Native-like performance. Battery-optimized.',
    },
    {
      iconName: 'Shield',
      title: 'Secure by Design',
      description: 'Encrypted storage, secure APIs, biometric auth. OWASP Mobile Top 10.',
    },
    {
      iconName: 'Users',
      title: 'User-Centric Design',
      description: 'Intuitive UX following iOS and Android guidelines. Users love it.',
    },
  ],
  technologies: [
    'React Native', 'Flutter', 'Swift', 'Kotlin',
    'TypeScript', 'Firebase', 'GraphQL', 'REST APIs',
    'Redux', 'MobX', 'Push Notifications', 'In-App Purchases',
  ],
  processSteps: [
    {
      number: '01',
      title: 'Product Strategy & Scope',
      description: 'Define key user journeys, offline requirements, and platform roadmap.',
    },
    {
      number: '02',
      title: 'Mobile UI/UX Design',
      description: 'Native design patterns for iOS Human Interface Guidelines & Material 3.',
    },
    {
      number: '03',
      title: 'Core App Engineering',
      description: 'Type-safe architecture with reactive state management and biometric auth.',
    },
    {
      number: '04',
      title: 'Device Matrix Testing',
      description: 'Testing across real physical devices and screen densities.',
    },
    {
      number: '05',
      title: 'Store Publishing & Launch',
      description: 'Complete Apple App Store & Google Play Store submission and approval handling.',
    },
  ],
  ctaHeadline: 'Ready to Build Your Mobile App?',
  ctaSubtitle: 'From napkin sketch to top of the App Store. Let us engineer your mobile product.',
};

