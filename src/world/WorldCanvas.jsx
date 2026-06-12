"use client";

import { Canvas } from "@react-three/fiber";
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

/**
 * The single persistent World Canvas. One renderer, one camera, one fogged
 * space containing every scene — so the camera literally flies from the room
 * through the cosmos and back. Pauses when the tab is hidden.
 */
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
            dpr={[1, 1.6]}
            gl={{
                antialias: true,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
            }}
            camera={{ position: [-0.6, 0.6, 7.8], fov: 42, near: 0.1, far: 200 }}
        >
            <color attach="background" args={["#05060a"]} />
            <fog attach="fog" args={["#05060a", 12, 62]} />
            <ambientLight intensity={0.35} />
            <hemisphereLight args={["#6f7bff", "#0a0a12", 0.4]} />

            <Suspense fallback={null}>
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
