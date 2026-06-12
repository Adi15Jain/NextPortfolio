"use client";

import { Billboard, useTexture } from "@react-three/drei";
import * as THREE from "three";

/**
 * A lightweight floating "screen" for a project — just the real screenshot on
 * a billboarded plane with a soft accent glow + thin bezel. No model, no
 * per-object lights: three planes + one tiny texture, so it's a fraction of the
 * cost of a device GLB and never mirrors the image. Always faces the camera.
 */
export default function ProjectPanel({
    screenshot,
    position = [0, 0, 0],
    width = 3.4,
    accent = "#7fb4ff",
}) {
    const tex = useTexture(screenshot);
    tex.colorSpace = THREE.SRGBColorSpace;

    // Size to the screenshot's real aspect ratio (no stretch).
    const aspect =
        tex.image && tex.image.width ? tex.image.width / tex.image.height : 1.6;
    const w = width;
    const h = width / aspect;

    return (
        <Billboard position={position}>
            {/* accent glow halo */}
            <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[w * 1.14, h * 1.18]} />
                <meshBasicMaterial color={accent} transparent opacity={0.16} />
            </mesh>
            {/* dark bezel */}
            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[w * 1.035, h * 1.06]} />
                <meshBasicMaterial color="#080a12" transparent />
            </mesh>
            {/* the live screenshot */}
            <mesh>
                <planeGeometry args={[w, h]} />
                <meshBasicMaterial map={tex} toneMapped={false} transparent />
            </mesh>
        </Billboard>
    );
}
