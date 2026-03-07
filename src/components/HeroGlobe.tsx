import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const WireframeGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  const allPoints = useMemo(() => {
    const result: [number, number, number][][] = [];
    const radius = 2;

    // Latitude lines
    for (let i = 0; i <= 12; i++) {
      const phi = (i / 12) * Math.PI;
      const points: [number, number, number][] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        points.push([
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        ]);
      }
      result.push(points);
    }

    // Longitude lines
    for (let i = 0; i < 24; i++) {
      const theta = (i / 24) * Math.PI * 2;
      const points: [number, number, number][] = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI;
        points.push([
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        ]);
      }
      result.push(points);
    }

    return result;
  }, []);

  return (
    <group ref={groupRef}>
      {allPoints.map((points, i) => (
        <Line key={i} points={points} color="#0a0a0a" lineWidth={0.8} transparent opacity={0.3} />
      ))}
    </group>
  );
};

const HeroGlobe = () => {
  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <WireframeGlobe />
      </Canvas>
    </div>
  );
};

export default HeroGlobe;
