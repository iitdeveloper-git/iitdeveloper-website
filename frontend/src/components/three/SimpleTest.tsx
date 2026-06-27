'use client';

export default function SimpleTest() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div className="w-32 h-32 bg-green-500 rounded-full animate-pulse" />
    </div>
  );
}
