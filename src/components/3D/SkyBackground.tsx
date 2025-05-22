
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";

const MovingSky = () => {
  const skyRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    if (skyRef.current) {
      // Slowly change the sun position for a dynamic sky effect
      skyRef.current.azimuth = Math.sin(clock.getElapsedTime() * 0.05) * 0.1 + 0.5;
    }
  });
  
  return <Sky ref={skyRef} sunPosition={[0, 1, 0]} turbidity={8} rayleigh={6} />;
};

export const SkyBackground = () => {
  return (
    <div className="fixed inset-0 h-full w-full -z-10">
      <Canvas>
        <MovingSky />
      </Canvas>
    </div>
  );
};
