
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Center } from "@react-three/drei";
import { Mesh } from "three";

const AnimatedText = () => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating animation
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <Center>
        <Text
          fontSize={0.5}
          maxWidth={4}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="/fonts/Inter-Bold.woff"
          color="#ffffff"
        >
          Madhupur Polytechnic College
        </Text>
      </Center>
    </mesh>
  );
};

export const AnimatedCollegeText = () => {
  return (
    <div className="h-40 w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="bg-transparent"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <AnimatedText />
      </Canvas>
    </div>
  );
};
