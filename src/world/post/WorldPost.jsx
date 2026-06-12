"use client";

import {
    EffectComposer,
    Bloom,
    ChromaticAberration,
    Vignette,
    Noise,
    ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";

/**
 * The cinematic grade — one composited pass over the whole World that turns
 * "good geometry in space" into the Awwwards look:
 *  · Bloom        — emissive screens / portals / streaks / logos glow as light
 *  · Chromatic    — a subtle lens fringe, strongest at the edges
 *    Aberration
 *  · Vignette     — focus the eye toward centre
 *  · Noise        — fine filmic grain
 *  · ToneMapping  — ACES (the renderer's tone-mapping is None so it's applied
 *                   exactly once, here, at the end)
 *
 * The "warp on scroll" feel is carried by the MorphField's velocity streak, so
 * the aberration stays static (avoids a per-frame ref into the effect uniforms).
 */
export default function WorldPost() {
    return (
        <EffectComposer multisampling={4} disableNormalPass>
            <Bloom
                mipmapBlur
                intensity={0.6}
                luminanceThreshold={0.55}
                luminanceSmoothing={0.32}
            />
            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.0012, 0.0012]}
                radialModulation
                modulationOffset={0.15}
            />
            <Vignette eskil={false} offset={0.26} darkness={0.62} />
            <Noise
                premultiply
                blendFunction={BlendFunction.SCREEN}
                opacity={0.04}
            />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
    );
}
