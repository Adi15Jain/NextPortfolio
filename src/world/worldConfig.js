/**
 * The flight path through ONE continuous space.
 *
 * COMPOSITION RULE (cinematography, not decoration):
 *   · The DOM content zone is the LEFT third of the frame.
 *   · Story assets are framed CENTER-RIGHT — look targets sit slightly +X of
 *     each region's mass so objects never sit under the text.
 *   · Fog is tight, so only the active scene is in focus (midground), the
 *     next scene is a faint silhouette (background), and dust is foreground.
 *
 * Each scene has a DWELL (two nearly-identical keys) so the frame settles
 * while the user reads, and TRAVEL between dwells.
 */
export const CAMERA_KEYS = [
    // SCENE 1 — workspace (room frames right, text zone left)
    { p: 0.0, pos: [-0.6, 0.6, 7.8], look: [1.6, 0.1, -1], fov: 42 },
    { p: 0.07, pos: [-0.4, 0.5, 6.6], look: [1.4, 0.1, -2], fov: 41 },
    // travel: commit to the monitor
    { p: 0.12, pos: [0, 0.3, 3.4], look: [0, 0.1, -5], fov: 39 },
    { p: 0.17, pos: [0, 0.12, 0.3], look: [0, 0.1, -8], fov: 36 },
    // SCENE 3 — ecosystem (systems cluster at +X, camera rides the left rail)
    { p: 0.24, pos: [-3.5, 1, -16], look: [2.5, 0.6, -26], fov: 56 },
    { p: 0.3, pos: [-4.2, 1.4, -22], look: [2.6, 0.4, -30], fov: 58 },
    { p: 0.37, pos: [-4.2, 1.2, -27], look: [2.6, 0.2, -34], fov: 58 }, // dwell
    { p: 0.42, pos: [-3.4, 0.6, -34], look: [2.8, 0, -44], fov: 58 },
    // SCENE 4 — galaxy (worlds at +X)
    { p: 0.48, pos: [-5, 0.4, -44], look: [3.2, 0.2, -54], fov: 58 },
    { p: 0.56, pos: [-5.2, 0.2, -50], look: [3.2, 0, -60], fov: 58 }, // dwell
    { p: 0.62, pos: [-4.2, 0.6, -60], look: [3.4, 0, -70], fov: 56 },
    // SCENE 5 — mind (core sits at +X; slow spiral-in, long dwell)
    { p: 0.69, pos: [-2.6, 1.6, -76], look: [2.6, 0.2, -85], fov: 48 },
    { p: 0.75, pos: [-2.2, 0.6, -79], look: [2.6, 0, -86], fov: 46 }, // dwell
    // SCENE 6 — timeline (rail flight straight through the gates)
    { p: 0.8, pos: [0, 0.2, -90], look: [0, 0.3, -102], fov: 52 },
    { p: 0.9, pos: [0, 0.2, -118], look: [0, 0.3, -130], fov: 54 },
    // SCENE 7 — RETURN (masked by flash; room as warm backdrop, frame right)
    { p: 0.94, pos: [-0.8, 0.8, 9], look: [1.8, 0.1, 0], fov: 44 },
    { p: 1.0, pos: [-0.6, 0.55, 7], look: [1.6, 0.1, -0.5], fov: 41 },
];

// Progress points where a full-white flash masks a threshold crossing.
export const FLASHES = [
    { at: 0.18, width: 0.05 }, // dive into the monitor
    { at: 0.915, width: 0.045 }, // surface back into the room
];

// Where each region's content physically sits in the shared space (−Z deep).
// Mind is offset +X so the core composes right-of-frame.
export const REGION = {
    room: [0, 0, 0],
    portal: [0, 0.1, -7],
    ecosystem: [0, 0, -30],
    galaxy: [0, 0, -56],
    mind: [2.6, 0, -86],
    timeline: [0, 0, -110],
};

// Tight fog = scene layering: active scene crisp, next scene a silhouette.
export const FOG = { color: "#05060a", near: 12, far: 62 };
