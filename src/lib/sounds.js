// Windows 7-style system sounds using Web Audio API
const audioCtx = typeof window !== "undefined" ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playTone(frequency, duration, type = "sine", volume = 0.15) {
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// Windows 7 startup chime — authentic 4-note ascending melody
export function playStartupSound() {
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();

    // Win7-inspired warm ascending chime: E4 → G4 → B4 → E5
    const chime = [
        { freq: 329.63, delay: 0, dur: 0.45, vol: 0.10, type: "sine" },   // E4
        { freq: 392.00, delay: 250, dur: 0.4, vol: 0.12, type: "sine" },   // G4
        { freq: 493.88, delay: 500, dur: 0.4, vol: 0.13, type: "sine" },   // B4
        { freq: 659.25, delay: 750, dur: 0.7, vol: 0.14, type: "sine" },   // E5 (held longer)
    ];

    // Add soft harmonic layer for richness
    const harmonics = [
        { freq: 164.81, delay: 0, dur: 1.2, vol: 0.04, type: "sine" },   // E3 bass pad
        { freq: 246.94, delay: 250, dur: 1.0, vol: 0.03, type: "sine" },   // B3 undertone
        { freq: 329.63, delay: 750, dur: 1.0, vol: 0.05, type: "triangle" }, // E4 shimmer
    ];

    [...chime, ...harmonics].forEach(({ freq, delay, dur, vol, type }) => {
        setTimeout(() => playTone(freq, dur, type, vol), delay);
    });
}

// Window open - a short ascending two-tone "ding"
export function playOpenSound() {
    playTone(600, 0.12, "sine", 0.1);
    setTimeout(() => playTone(900, 0.15, "sine", 0.08), 60);
}

// Window close - a short descending tone
export function playCloseSound() {
    playTone(800, 0.1, "sine", 0.08);
    setTimeout(() => playTone(500, 0.12, "sine", 0.06), 50);
}

// Click / selection
export function playClickSound() {
    playTone(1200, 0.04, "square", 0.04);
}

// Error / denied
export function playErrorSound() {
    playTone(300, 0.15, "square", 0.1);
    setTimeout(() => playTone(250, 0.2, "square", 0.08), 150);
}

// Start menu open
export function playMenuSound() {
    playTone(800, 0.08, "sine", 0.06);
    setTimeout(() => playTone(1000, 0.1, "sine", 0.05), 40);
}

// Minimize
export function playMinimizeSound() {
    playTone(700, 0.08, "sine", 0.06);
    setTimeout(() => playTone(500, 0.1, "sine", 0.04), 50);
}
