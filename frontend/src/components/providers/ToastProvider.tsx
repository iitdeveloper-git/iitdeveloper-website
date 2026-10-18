'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(13, 18, 21, 0.95)',
          backdropFilter: 'blur(20px)',
          color: '#F0F6F3',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '16px 24px',
          fontSize: '14px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        success: {
          iconTheme: {
            primary: '#8BE0BA',
            secondary: '#0D1215',
          },
          style: {
            border: '1px solid rgba(139, 224, 186, 0.2)',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#0D1215',
          },
          style: {
            border: '1px solid rgba(239, 68, 68, 0.2)',
          },
        },
        loading: {
          iconTheme: {
            primary: '#8BE0BA',
            secondary: '#0D1215',
          },
        },
      }}
    />
  );
}
