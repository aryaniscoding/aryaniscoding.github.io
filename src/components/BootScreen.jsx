import { useState, useEffect } from "react";
import { playStartupSound } from "@/lib/sounds";

export default function BootScreen({ onComplete }) {
    const [phase, setPhase] = useState("loading"); // loading | fadeout | done

    useEffect(() => {
        // Play startup sound
        const soundTimer = setTimeout(() => playStartupSound(), 500);
        const fadeTimer = setTimeout(() => setPhase("fadeout"), 3200);
        return () => {
            clearTimeout(soundTimer);
            clearTimeout(fadeTimer);
        };
    }, []);

    useEffect(() => {
        if (phase === "fadeout") {
            const timer = setTimeout(() => onComplete(), 700);
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete]);

    if (phase === "done") return null;

    return (
        <div
            className="boot-screen"
            style={{
                opacity: phase === "fadeout" ? 0 : 1,
                transition: "opacity 0.7s ease-in-out",
            }}
        >
            {/* Pixelated Windows-style logo */}
            <div className="boot-logo">
                <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="38" height="38" rx="2" fill="#F25022" />
                    <rect x="48" y="2" width="38" height="38" rx="2" fill="#7FBA00" />
                    <rect x="2" y="48" width="38" height="38" rx="2" fill="#00A4EF" />
                    <rect x="48" y="48" width="38" height="38" rx="2" fill="#FFB900" />
                </svg>
            </div>

            {/* Bouncing pixel orbs */}
            <div className="boot-orbs">
                <div className="boot-orb" />
                <div className="boot-orb" />
                <div className="boot-orb" />
                <div className="boot-orb" />
            </div>

            <p className="boot-text">Starting AryanOS...</p>
            <p className="boot-subtitle">v1.0 – Portfolio Edition</p>
        </div>
    );
}
