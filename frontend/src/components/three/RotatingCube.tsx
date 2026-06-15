'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export function RotatingCube({ 
  position,
  color = '#FFD662',
  size = 1
}: { 
  position: [number, number, number];
  color?: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
    
    // Subtle floating
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3;
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[size, size, size]}
      position={position}
      radius={0.1}
      smoothness={4}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.8}
        roughness={0.3}
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </RoundedBox>
  );
}
