"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.15, 8]} />
        <MeshDistortMaterial
          color="#C4B5FD"
          emissive="#F3A6C8"
          emissiveIntensity={0.45}
          roughness={0.12}
          metalness={0.55}
          distort={0.25}
          speed={1}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[1.95, 0.03, 16, 100]} />
        <meshStandardMaterial color="#7DD3FC" emissive="#7DD3FC" emissiveIntensity={0.6} transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

export default function GlowingSphere() {
  return (
    <div className="relative h-[280px] w-full sm:h-[320px] md:h-[420px]">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(243,166,200,0.22),rgba(17,24,39,0)_58%)]" />
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3.6], fov: 45 }} className="h-full w-full">
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 2, 4]} intensity={1.2} color="#C4B5FD" />
        <directionalLight position={[-2, -1, -2]} intensity={0.6} color="#7DD3FC" />
        <Sparkles count={32} scale={3.8} size={2} speed={0.25} color="#F3A6C8" />
        <Orb />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}
