"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import WorldDust from "./WorldDust";
import StreamBridges from "./StreamBridges";
import EcosystemScene from "./scenes/EcosystemScene";
import GalaxyScene from "./scenes/GalaxyScene";
import MindScene from "./scenes/MindScene";
import {
    Workspace,
    WorkspaceLights,
    PortalGate,
    Timeline,
} from "./WorldScenes";

// Self-host the Draco decoder (copied into /public/draco) so compressed asset
// models decode without a third-party CDN. Textures ship as WebP (no extra
// transcoder needed).
if (typeof useGLTF.setDecoderPath === "function") {
    useGLTF.setDecoderPath("/draco/");
}

/**
 * A procedural studio environment — no HDRI file, built from Lightformers.
 * Gives every metal/glass/device material real image-based reflections and a
 * soft IBL fill, which is what makes models read as "real" rather than flat.
 * Baked once (frames={1}); only affects reflections, not the visible bg.
 */
function WorldEnvironment() {
    return (
        <Environment resolution={256} frames={1}>
            <color attach="background" args={["#06070c"]} />
            {/* cool key (upper right) */}
            <Lightformer
                intensity={2.2}
                color="#9ec9ff"
                position={[5, 4, 3]}
                scale={[7, 7, 1]}
            />
            {/* warm fill (left) */}
            <Lightformer
                intensity={1.1}
                color="#ffe9c9"
                position={[-6, 2, -2]}
                scale={[6, 6, 1]}
            />
            {/* violet underglow */}
            <Lightformer
                intensity={0.7}
                color="#a78bfa"
                position={[0, -4, -4]}
                scale={[9, 4, 1]}
            />
            {/* faint rim from behind */}
            <Lightformer
                intensity={0.9}
                color="#7fd2ff"
                position={[0, 1, -8]}
                scale={[8, 5, 1]}
            />
        </Environment>
    );
}

export default function WorldCanvas() {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const onVis = () => setVisible(document.visibilityState !== "hidden");
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    return (
        <Canvas
            className="world-canvas"
            frameloop={visible ? "always" : "never"}
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
            }}
            camera={{ position: [-0.6, 0.6, 7.8], fov: 42, near: 0.1, far: 200 }}
        >
            <color attach="background" args={["#05060a"]} />
            <fog attach="fog" args={["#05060a", 12, 62]} />
            <ambientLight intensity={0.28} />
            <hemisphereLight args={["#6f7bff", "#0a0a12", 0.32]} />

            <Suspense fallback={null}>
                <WorldEnvironment />

                <CameraRig />
                <WorldDust count={850} />

                <WorkspaceLights />
                <Workspace />
                <PortalGate />
                <EcosystemScene />
                <GalaxyScene />
                <MindScene />
                <Timeline />
                <StreamBridges />
            </Suspense>
        </Canvas>
    );
}
