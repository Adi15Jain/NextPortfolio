"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";
import Room from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import ResumeBook from "./ResumeBook";

const HeroExperience = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <Suspense fallback={null}>
                <OrbitControls
                    enablePan={false}
                    enableZoom={!isTablet}
                    maxDistance={20}
                    minDistance={5}
                    minPolarAngle={Math.PI / 5}
                    maxPolarAngle={Math.PI / 2}
                />
                <HeroLights />
                <Particles count={200} />
                <group
                    scale={isMobile ? 0.7 : 1}
                    position={[0, -3.5, 0]}
                    rotation={[0, -Math.PI / 4, 0]}
                >
                    <Room />
                    {/*
                        Resume sits on the desk surface.
                        Position is in the room-group local space.
                        x: ~1.6 (right side of desk), y: 0.57 (just above table), z: 0.5
                    */}
                    <ResumeBook position={[1.6, 0.57, 0.5]} />
                </group>
            </Suspense>
        </Canvas>
    );
};

export default HeroExperience;
