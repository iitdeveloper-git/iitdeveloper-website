'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GridPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Subtle wave effect
    const time = state.clock.elapsedTime;
    meshRef.current.position.z = Math.sin(time * 0.5) * 0.5;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
    >
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial
        color="#00539C"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}
