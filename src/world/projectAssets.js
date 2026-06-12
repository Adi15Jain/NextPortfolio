/**
 * Project → screenshot registry (Hybrid art direction, lightweight version).
 *
 * Each entry shows the project's real screenshot on a floating, camera-facing
 * `ProjectPanel` (no device model — just a textured plane + glow, so it's
 * cheap and never mirrors the image). Projects WITHOUT an entry keep their
 * procedural station, so the world upgrades incrementally and never breaks.
 *
 * `position` = the Galaxy slot (matches the procedural placement it replaces).
 */
export const projectAssets = {
    interviewpilot: {
        screenshot: "/textures/screens/interviewpilot.webp",
        position: [3.3, 0.4, -55],
        accent: "#f5a623",
        prop: {
            model: "/models/props/headset.glb",
            offset: [-2.9, -0.1, 0.4],
            scale: 0.62,
            spin: 0.25,
        },
    },
    pneumoai: {
        screenshot: "/textures/screens/pneumoai.webp",
        position: [1.7, 2.3, -49],
        accent: "#5fd0e0",
        prop: {
            model: "/models/props/lungs.glb",
            offset: [-2.7, -0.2, 0.4],
            scale: 0.6,
            spin: 0.3,
        },
    },
    coinpush: {
        screenshot: "/textures/screens/coinpush.webp",
        position: [6.3, 1.4, -51.5],
        accent: "#2ec27e",
    },
    exyst: {
        screenshot: "/textures/screens/exyst.webp",
        position: [1.6, -2.0, -58.5],
        accent: "#c9b48a",
    },
    vectrion: {
        screenshot: "/textures/screens/vectrion.webp",
        position: [2.3, 2.2, -64],
        accent: "#9aa7ff",
    },
    telechurn: {
        screenshot: "/textures/screens/telechurn.webp",
        position: [3.3, -2.6, -69],
        accent: "#e08a5f",
    },
    // wealthyminds, archlens → keep procedural until screenshots exist.
};

export const hasAsset = (id) => Boolean(projectAssets[id]);
