"use client";

import {
    Environment,
    Float,
    OrbitControls,
    useGLTF,
    PerspectiveCamera,
} from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

const TechIcon = ({ model }) => {
    const { scene } = useGLTF(model.modelPath);

    // Clone the scene to avoid mutation issues when reusing models in multiple Views
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
        if (model.name === "Interactive Development (Three.js)") {
            clonedScene.traverse((child) => {
                if (child.isMesh && child.name === "Object_5") {
                    child.material = new THREE.MeshStandardMaterial({
                        color: "white",
                    });
                }
            });
        }
    }, [model.name, clonedScene]);

    return (
        <>
            {/* Explicit camera for this View ensures the model is always centered and visible */}
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />
            <Environment preset="city" />

            <OrbitControls enableZoom={false} enablePan={false} />

            <Float speed={5} rotationIntensity={0.5} floatIntensity={0.5}>
                <group scale={model.scale} rotation={model.rotation}>
                    <primitive object={clonedScene} />
                </group>
            </Float>
        </>
    );
};

export default TechIcon;
