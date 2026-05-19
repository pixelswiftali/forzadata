'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D9FF" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#FF0055" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#00D9FF" />
    </>
  );
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.0005;
      meshRef.current.rotation.y += 0.001;
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, -2]}>
      <meshPhongMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={0.2}
        wireframe={false}
      />
    </Sphere>
  );
}

function FloatingGeometries() {
  const group1 = useRef<THREE.Group>(null);
  const group2 = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (group1.current) {
      group1.current.rotation.x = clock.elapsedTime * 0.3;
      group1.current.rotation.y = clock.elapsedTime * 0.2;
      group1.current.position.x = Math.sin(clock.elapsedTime * 0.5) * 3;
    }
    if (group2.current) {
      group2.current.rotation.x = -clock.elapsedTime * 0.2;
      group2.current.rotation.y = clock.elapsedTime * 0.3;
      group2.current.position.x = Math.cos(clock.elapsedTime * 0.5) * 3;
    }
  });

  return (
    <>
      <group ref={group1}>
        <mesh position={[-3, 0, 0]}>
          <octahedronGeometry args={[0.8, 2]} />
          <meshPhongMaterial color="#FF0055" wireframe={true} opacity={0.4} transparent />
        </mesh>
      </group>
      <group ref={group2}>
        <mesh position={[3, 0, 0]}>
          <icosahedronGeometry args={[0.8, 2]} />
          <meshPhongMaterial color="#00D9FF" wireframe={true} opacity={0.4} transparent />
        </mesh>
      </group>
    </>
  );
}

export function ThreeDHero() {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-background to-card">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <AnimatedLights />
        <AnimatedSphere />
        <FloatingGeometries />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={2}
        />
      </Canvas>
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-4">
          <h1 className="text-6xl sm:text-7xl font-bold text-foreground drop-shadow-lg">
            Explore & Compare
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Every Car
            </span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto drop-shadow-md">
            The ultimate interactive car database for Forza Horizon 6 with stunning 3D visualizations
          </p>
        </div>
      </div>
    </div>
  );
}
