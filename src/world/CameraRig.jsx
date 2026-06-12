"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { journey } from "./journeyStore";
import { CAMERA_KEYS } from "./worldConfig";

const smoothstep = (t) => t * t * (3 - 2 * t);

const sampleKeys = (p, outPos, outLook, fovRef) => {
    const keys = CAMERA_KEYS;
    // Find the segment [a, b] surrounding progress p.
    let a = keys[0];
    let b = keys[keys.length - 1];
    for (let i = 0; i < keys.length - 1; i++) {
        if (p >= keys[i].p && p <= keys[i + 1].p) {
            a = keys[i];
            b = keys[i + 1];
            break;
        }
    }
    const span = b.p - a.p || 1;
    const t = smoothstep(Math.min(1, Math.max(0, (p - a.p) / span)));

    outPos.set(
        THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
        THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
        THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
    );
    outLook.set(
        THREE.MathUtils.lerp(a.look[0], b.look[0], t),
        THREE.MathUtils.lerp(a.look[1], b.look[1], t),
        THREE.MathUtils.lerp(a.look[2], b.look[2], t),
    );
    fovRef.value = THREE.MathUtils.lerp(a.fov, b.fov, t);
};

/**
 * Drives the single camera along the flight path from journey progress, with
 * damped follow, cursor micro-parallax, and FOV breathing. This is what turns
 * "scroll" into "moving through a world."
 */
export default function CameraRig() {
    const { camera } = useThree();
    const targetPos = useRef(new THREE.Vector3(...CAMERA_KEYS[0].pos));
    const targetLook = useRef(new THREE.Vector3(...CAMERA_KEYS[0].look));
    const curLook = useRef(new THREE.Vector3(...CAMERA_KEYS[0].look));
    const fovRef = useRef({ value: CAMERA_KEYS[0].fov });
    const pointer = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        const dt = Math.min(delta, 0.05);

        sampleKeys(journey.progress, targetPos.current, targetLook.current, fovRef.current);

        // Cursor micro-parallax — the world always breathes toward you.
        pointer.current.x += (state.pointer.x - pointer.current.x) * dt * 2;
        pointer.current.y += (state.pointer.y - pointer.current.y) * dt * 2;
        const par = 0.8;

        const follow = 1 - Math.pow(0.0016, dt); // frame-rate-independent damping
        camera.position.x += (targetPos.current.x + pointer.current.x * par - camera.position.x) * follow;
        camera.position.y += (targetPos.current.y + pointer.current.y * par * 0.6 - camera.position.y) * follow;
        camera.position.z += (targetPos.current.z - camera.position.z) * follow;

        curLook.current.x += (targetLook.current.x + pointer.current.x * par * 0.5 - curLook.current.x) * follow;
        curLook.current.y += (targetLook.current.y + pointer.current.y * par * 0.5 - curLook.current.y) * follow;
        curLook.current.z += (targetLook.current.z - curLook.current.z) * follow;
        camera.lookAt(curLook.current);

        const targetFov = fovRef.current.value;
        if (Math.abs(camera.fov - targetFov) > 0.01) {
            camera.fov += (targetFov - camera.fov) * follow;
            camera.updateProjectionMatrix();
        }
    });

    return null;
}
