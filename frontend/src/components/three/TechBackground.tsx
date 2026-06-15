'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleNetwork() {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [isReady, setIsReady] = useState(false);
  
  const particleCount = 50;

  // Check if we're inside a Canvas context
  useEffect(() => {
    setIsReady(true);
  }, []);

  const { positions, connections } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const connections: number[] = [];
    
    // Create random particle positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    
    // Create connections between nearby particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < 4) {
          connections.push(i, j);
        }
      }
    }
    
    return { positions, connections };
  }, []);

  useFrame((state) => {
    if (!isReady || !particlesRef.current || !linesRef.current) return;
    
    const time = state.clock.elapsedTime * 0.1;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate particles with gentle floating
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += Math.sin(time + i * 0.5) * 0.002;
      positions[i * 3] += Math.cos(time + i * 0.3) * 0.001;
    }
    
    // Update line positions to match particles
    for (let i = 0; i < connections.length; i += 2) {
      const idx1 = connections[i];
      const idx2 = connections[i + 1];
      
      linePositions[i * 3] = positions[idx1 * 3];
      linePositions[i * 3 + 1] = positions[idx1 * 3 + 1];
      linePositions[i * 3 + 2] = positions[idx1 * 3 + 2];
      
      linePositions[(i + 1) * 3] = positions[idx2 * 3];
      linePositions[(i + 1) * 3 + 1] = positions[idx2 * 3 + 1];
      linePositions[(i + 1) * 3 + 2] = positions[idx2 * 3 + 2];
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Gentle rotation
    particlesRef.current.rotation.y += 0.0005;
    linesRef.current.rotation.y += 0.0005;
  });
  
  const linePositions = useMemo(() => {
    const linePos = new Float32Array(connections.length * 3);
    for (let i = 0; i < connections.length; i++) {
      const idx = connections[i];
      linePos[i * 3] = positions[idx * 3];
      linePos[i * 3 + 1] = positions[idx * 3 + 1];
      linePos[i * 3 + 2] = positions[idx * 3 + 2];
    }
    return linePos;
  }, [connections, positions]);

  return (
    <group>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#00539C"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00539C"
          transparent
          opacity={0.2}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

function FloatingOrbs() {
  const orbsRef = useRef<THREE.Group>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);
  
  useFrame((state) => {
    if (!isReady || !orbsRef.current) return;
    
    const time = state.clock.elapsedTime;
    orbsRef.current.children.forEach((orb, i) => {
      orb.position.y = Math.sin(time * 0.5 + i * 2) * 2;
      orb.rotation.x += 0.005;
      orb.rotation.y += 0.003;
    });
  });
  
  return (
    <group ref={orbsRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[i * 6 - 6, 0, -8]}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial
            color={i === 0 ? '#00539C' : i === 1 ? '#00539C' : '#FFD662'}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function TechBackground() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00539C" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FFD662" />
      
      {/* Particle Network */}
      <ParticleNetwork />
      
      {/* Floating Orbs */}
      <FloatingOrbs />
    </>
  );
}
