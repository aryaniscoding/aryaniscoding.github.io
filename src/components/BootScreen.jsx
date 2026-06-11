import { useState, useEffect } from "react";
import { WindowsFlag } from "./Icons";
import { playStartupSound } from "@/lib/sounds";

export default function BootScreen({ onComplete }) {
    const [phase, setPhase] = useState("loading"); // loading | fadeout | done

    useEffect(() => {
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
            style={{ opacity: phase === "fadeout" ? 0 : 1, transition: "opacity 0.7s ease-in-out" }}
        >
            <div className="boot-logo">
                <WindowsFlag size={110} />
            </div>

            <div className="boot-orbs">
                <div className="boot-orb" />
                <div className="boot-orb" />
                <div className="boot-orb" />
                <div className="boot-orb" />
            </div>

            <p className="boot-text">Starting AryanOS</p>
            <p className="boot-subtitle">v1.0 — Portfolio Edition</p>
        </div>
    );
}
