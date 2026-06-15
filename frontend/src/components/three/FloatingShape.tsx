'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function FloatingShape({ 
  position, 
  color = '#00539C',
  speed = 1,
  geometry = 'box'
}: { 
  position: [number, number, number];
  color?: string;
  speed?: number;
  geometry?: 'box' | 'sphere' | 'torus' | 'octahedron';
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotate the shape
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
    
    // Add subtle floating motion
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.2;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.3}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}
