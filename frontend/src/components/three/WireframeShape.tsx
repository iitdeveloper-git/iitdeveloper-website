'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function WireframeShape({
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;
    
    // Pulse effect
    const pulseFactor = Math.sin(state.clock.elapsedTime) * 0.1 + 1;
    meshRef.current.scale.setScalar(scale * pulseFactor);
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color="#00539C"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}
