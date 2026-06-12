/**
 * Shape target buffers for the "Made of Light" morph field. Each function
 * returns a Float32Array of N*3 positions (centred on the origin) that the
 * particle organism morphs into for one beat of the journey. Procedural +
 * deterministic (seeded) so they're pure and cheap to build once at boot.
 *
 * The shapes are LARGE and volumetric (radius ~16–42) and the field is
 * camera-centred, so the organism fills the whole viewport as a dispersed
 * atmosphere rather than a tight central clump. A depth fade in the shader
 * hollows out the content zone so it always reads behind the room / panels /
 * logos. Lower particle counts + bigger volume = an airy, elegant field.
 */

const seeded = (s) => {
    let x = s >>> 0;
    return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296);
};

const TAU = Math.PI * 2;

// A calm, wide dispersed cloud — the resting "stardust" (workspace / return).
export const cloud = (N, seed = 1) => {
    const r = seeded(seed);
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
        const rad = 15 + Math.pow(r(), 0.5) * 27; // 15..42, dense-to-sparse
        const th = r() * TAU;
        const ph = Math.acos(2 * r() - 1);
        a[i * 3] = rad * Math.sin(ph) * Math.cos(th);
        a[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th) * 0.85;
        a[i * 3 + 2] = rad * Math.cos(ph);
    }
    return a;
};

// A large sweeping vortex spiral that fills the frame — the portal pull.
export const vortex = (N, seed = 2) => {
    const r = seeded(seed);
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
        const t = i / N;
        const ang = t * TAU * 5 + r() * 0.4;
        const rad = 7 + (1 - t) * 31 + (r() - 0.5) * 3.5; // 7..38, soft edges
        a[i * 3] = Math.cos(ang) * rad;
        a[i * 3 + 1] = Math.sin(ang) * rad;
        a[i * 3 + 2] = -6 - t * 32 + (r() - 0.5) * 4;
    }
    return a;
};

// A big spherical shell with real thickness — the integrated stack / a "world".
export const sphere = (N, seed = 3, radius = 27) => {
    const r = seeded(seed);
    const a = new Float32Array(N * 3);
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const th = ga * i;
        const shell = radius * (0.82 + r() * 0.34); // thick, airy shell
        a[i * 3] = Math.cos(th) * rad * shell;
        a[i * 3 + 1] = y * shell;
        a[i * 3 + 2] = Math.sin(th) * rad * shell;
    }
    return a;
};

// A wide spiral-galaxy disc that spans the frame — the project galaxy.
export const galaxy = (N, seed = 4) => {
    const r = seeded(seed);
    const a = new Float32Array(N * 3);
    const arms = 3;
    for (let i = 0; i < N; i++) {
        const t = Math.pow(r(), 0.55);
        const rad = 5 + t * 35;
        const arm = (i % arms) / arms;
        const ang = arm * TAU + t * 4.2 + (r() - 0.5) * 0.6;
        a[i * 3] = Math.cos(ang) * rad;
        a[i * 3 + 1] = (r() - 0.5) * (3 + (1 - t) * 6);
        a[i * 3 + 2] = Math.sin(ang) * rad;
    }
    return a;
};

// Two big concentric synaptic shells — the engineering mind.
export const mind = (N, seed = 5) => {
    const r = seeded(seed);
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
        const rad = (i % 2 ? 17 : 29) * (0.9 + r() * 0.2);
        const th = r() * TAU;
        const ph = Math.acos(2 * r() - 1);
        a[i * 3] = rad * Math.sin(ph) * Math.cos(th);
        a[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
        a[i * 3 + 2] = rad * Math.cos(ph);
    }
    return a;
};

// A long, wide forward-streaking tube — the time tunnel rushing past.
export const stream = (N, seed = 6) => {
    const r = seeded(seed);
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
        const ang = r() * TAU;
        const rad = 6 + Math.pow(r(), 0.7) * 17; // 6..23 wide tube
        a[i * 3] = Math.cos(ang) * rad;
        a[i * 3 + 1] = Math.sin(ang) * rad;
        a[i * 3 + 2] = (r() - 0.5) * 92; // long rush of light
    }
    return a;
};

/* The journey's shape sequence + the progress point each is centred on. The
   organism morphs between consecutive shapes as the camera travels. */
export const buildShapes = (N) => [
    { at: 0.0, buf: cloud(N, 11) }, // workspace — resting dust
    { at: 0.18, buf: vortex(N, 22) }, // portal — vortex
    { at: 0.33, buf: sphere(N, 33) }, // ecosystem — a world of tools
    { at: 0.52, buf: galaxy(N, 44) }, // galaxy — projects
    { at: 0.69, buf: mind(N, 55) }, // mind — synaptic shells
    { at: 0.84, buf: stream(N, 66) }, // timeline — time stream
    { at: 0.98, buf: cloud(N, 77) }, // future — return to dust
];
