"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import AtmosphereField from "./AtmosphereField";

/**
 * The fixed, full-viewport WebGL backdrop. Renders behind every section at
 * z-index:-1 so all content appears to float inside a single 3D space.
 *
 * Performance guards:
 *  - frameloop pauses entirely when the tab is hidden (battery / CPU).
 *  - dpr capped at 1.5, antialias off, low-power friendly clear.
 *  - particle count scaled by the caller's device tier.
 */
export default function AtmosphereCanvas({ count = 850, intensity = 1 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const onVisibility = () =>
            setVisible(document.visibilityState !== "hidden");
        document.addEventListener("visibilitychange", onVisibility);
        return () =>
            document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    return (
        <Canvas
            className="atmosphere-canvas"
            frameloop={visible ? "always" : "never"}
            dpr={[1, 1.5]}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: "low-power",
                depth: false,
                stencil: false,
            }}
            camera={{ position: [0, 0, 16], fov: 60, near: 0.1, far: 120 }}
        >
            <Suspense fallback={null}>
                <AtmosphereField count={count} intensity={intensity} />
            </Suspense>
        </Canvas>
    );
}
