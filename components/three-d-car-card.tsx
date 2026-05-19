'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Car3D() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.01 : 0.005;
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      {/* Car body - simplified box */}
      <mesh position={[0, 0.3, 0]} scale={[1.2, 0.6, 2]}>
        <boxGeometry />
        <meshPhongMaterial
          color={hovered ? '#FF0055' : '#00D9FF'}
          emissive={hovered ? '#FF0055' : '#00D9FF'}
          emissiveIntensity={hovered ? 0.4 : 0.2}
        />
      </mesh>

      {/* Wheels */}
      <mesh position={[-0.5, 0, 0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation-z={Math.PI / 2} />
        <meshPhongMaterial color="#333" />
      </mesh>
      <mesh position={[0.5, 0, 0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation-z={Math.PI / 2} />
        <meshPhongMaterial color="#333" />
      </mesh>
      <mesh position={[-0.5, 0, -0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation-z={Math.PI / 2} />
        <meshPhongMaterial color="#333" />
      </mesh>
      <mesh position={[0.5, 0, -0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation-z={Math.PI / 2} />
        <meshPhongMaterial color="#333" />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.7, -0.2]} scale={[0.8, 0.5, 0.8]}>
        <boxGeometry />
        <meshPhongMaterial
          color={hovered ? '#FF0055' : '#00D9FF'}
          emissive={hovered ? '#FF0055' : '#00D9FF'}
          emissiveIntensity={hovered ? 0.5 : 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

interface ThreeDCarCardProps {
  carName: string;
  carClass: string;
  carPI?: number;
}

export function ThreeDCarCard({ carName, carClass, carPI }: ThreeDCarCardProps) {
  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-card to-background border border-border group hover:border-accent transition-colors">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00D9FF" />
        <pointLight position={[-5, -5, 5]} intensity={1} color="#FF0055" />
        <Car3D />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      </Canvas>

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
        <h3 className="text-sm font-bold text-foreground truncate">{carName}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent font-semibold">
            Class {carClass}
          </span>
          {carPI && <span className="text-xs text-text-muted">PI: {carPI}</span>}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent-secondary/0 animate-pulse" />
      </div>
    </div>
  );
}
