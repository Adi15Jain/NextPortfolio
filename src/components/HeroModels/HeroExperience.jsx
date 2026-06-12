"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useRef, useState } from "react";
import Room from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

/**
 * Cinematic entry dolly: the camera starts pulled back and eases in toward the
 * room on first paint, so the user feels like they're arriving inside the
 * scene. Once the move settles, OrbitControls take over from the rested pose.
 * Skipped entirely for reduced-motion users.
 */
const CameraRig = ({ onArrived }) => {
    const { camera } = useThree();
    const started = useRef(false);
    const target = useRef(15);

    useFrame((_, delta) => {
        if (!started.current) {
            started.current = true;
            const reduced =
                typeof window !== "undefined" &&
                window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
            if (reduced) {
                camera.position.set(0, 0, 15);
                onArrived();
                return;
            }
            camera.position.set(0, 1.5, 26);
        }

        const dt = Math.min(delta, 0.05);
        camera.position.z += (target.current - camera.position.z) * dt * 1.6;
        camera.position.y += (0 - camera.position.y) * dt * 1.6;
        camera.lookAt(0, 0, 0);

        if (Math.abs(camera.position.z - target.current) < 0.06) {
            camera.position.set(0, 0, 15);
            onArrived();
        }
    });

    return null;
};

const HeroExperience = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [arrived, setArrived] = useState(false);

    return (
        <Canvas
            camera={{ position: [0, 1.5, 26], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
        >
            <Suspense fallback={null}>
                {!arrived && <CameraRig onArrived={() => setArrived(true)} />}
                {arrived && (
                    <OrbitControls
                        enablePan={false}
                        enableZoom={true}
                        maxDistance={20}
                        minDistance={5}
                        minPolarAngle={Math.PI / 5}
                        maxPolarAngle={Math.PI / 2}
                    />
                )}
                <HeroLights />
                <Particles count={200} />
                <group
                    scale={isMobile ? 0.7 : 1}
                    position={[0, -3.5, 0]}
                    rotation={[0, -Math.PI / 4, 0]}
                >
                    <Room />
                </group>
            </Suspense>
        </Canvas>
    );
};

export default HeroExperience;
