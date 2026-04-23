"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

const MODEL_PATH = "/assets/lady3dmodel/source/model.glb";

useGLTF.preload(MODEL_PATH);

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  const ref = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    if (ref.current) {
      const targetY = pointer.x * 0.5;
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.05);
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default function LadyModel() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 1, 3], fov: 30 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}